from sqlalchemy import (
    create_engine,
    MetaData,
    Table,
    Column,
    String,
    Integer,
    select,
    column,
)

from sqlalchemy import insert
from sqlalchemy.engine import URL

from llama_index.indices.struct_store.sql_query import NLSQLTableQueryEngine
from llama_index import SQLDatabase, ServiceContext
from llama_index.llms import ChatMessage
from llama_index.vector_stores import RedisVectorStore
from typing import List
import ast

import logging
import sys

logging.basicConfig(stream=sys.stdout, level=logging.INFO)
logging.getLogger().addHandler(logging.StreamHandler(stream=sys.stdout))

from llama_index import VectorStoreIndex, ServiceContext
from llama_index.llms import HuggingFaceLLM

import torch

from langchain.embeddings.huggingface import HuggingFaceEmbeddings
from llama_index import LangchainEmbedding, ServiceContext


class InferencePipeline:

    def __init__(self):

        url = URL.create(
            drivername="postgresql",
            username="flipkart",
            host="localhost",
            database="flipkart",
            password="flipkart"
        )

        engine = create_engine(url)
        metadata_obj = MetaData()

        table_name = "products_product"

        metadata_obj.create_all(engine)

        self.sql_database = SQLDatabase(engine, include_tables=["products_product"])

        embed_model = LangchainEmbedding(
        HuggingFaceEmbeddings(model_name="sentence-transformers/all-mpnet-base-v2")
        )

        self.llm = HuggingFaceLLM(
            context_window=4096,
            max_new_tokens=256,
            generate_kwargs={"temperature": 0.0, "do_sample": False},
            # system_prompt=system_prompt,
            # query_wrapper_prompt=query_wrapper_prompt,
            tokenizer_name="meta-llama/Llama-2-13b-chat-hf",
            model_name="meta-llama/Llama-2-13b-chat-hf",
            # tokenizer_name="chavinlo/alpaca-native",
            # model_name= "chavinlo/alpaca-native",
            device_map="auto",
            # uncomment this if using CUDA to reduce memory usage
            model_kwargs={
                "torch_dtype": torch.float16,
                "load_in_8bit": True
            }
        )

        self.service_context = ServiceContext.from_defaults(
            llm = self.llm, embed_model=embed_model, chunk_size=1024)


    def generate_questions(self, user_query: str) -> List[str]:
        system_message = '''
            You are given with Postgres table with the following columns.
            
            id, title, image_url, actual_price, brand, category_id, rating, selling_price and description.
            
            Your task is to decompose the given question into the following two questions and output should only contain these two.
            
            1. Question in natural language that needs to be asked to retrieve results from the table.
            2. Question that needs to be asked on the top of the result from the first question to provide the final answer.
            
            Examples:
            
            Input:
            I am a 22 years old women looking for a relaxed outfit.
            
            Output:
            1. Get the id, title, image_url, actual_price, brand, category_id, rating, selling_price and description of those whose age is 22 and whose gender is Women.
            2. Return the similarity score.

            Input:
            I am a 27 years old men looking for a party outfit.

            Output:
            1. Get theid, title, image_url, actual_price, brand, rating, selling_price and description of those whose age is 27 and whose gender is Men.
            2. Return the similarity score.

            Input:
            I am a 20 years old women looking for a wedding outfit.

            Output:
            1. Get the id, title, gender, age, image_url, actual_price, brand, rating, selling_price and description of those whose age is 20 and whose gender is Women.
            2. Return the similarity score.

            User query: 
        '''

        message = ChatMessage(role="user", content=system_message + "  " + user_query),

        generated_questions = self.llm.chat(message).message.content

        return generated_questions


    def forward(self, user_query):
        # user_query = "I am a 22 years old men looking for a relaxed outfit"
        # decomposition = self.generate_questions(user_query)

        # decomposition_list = decomposition.split('\n')
        text_to_sql_query = "1. What are the id, title, gender, age, image_url, actual_price, brand, rating, selling_price and description of those whose gender is Men and age is 20"
        # print(decomposition_list)

        # for line in decomposition_list:
        #     if (line.strip().startswith("1.")):
        #         text_to_sql_query = line.strip()

        print("Text to SQL query", text_to_sql_query)

        # Create SQL Query Engine
        sql_query_engine = NLSQLTableQueryEngine(
            sql_database=self.sql_database,
            tables=["products_product"],
            synthesize_response = False,
            service_context = self.service_context
        )

        sql_response = sql_query_engine.query(text_to_sql_query)

        print(sql_response)

        sql_response_list = ast.literal_eval(sql_response.response)
        print(sql_response_list)

        # text = [' '.join(t) for t in sql_response_list]
        # text = ' '.join(text)

        print(sql_response.metadata["sql_query"])

        # print(documents[0])

        # listindex = ListIndex([Document(text=text)])
        # list_query_engine = listindex.as_query_engine()
        # index = ListIndex.from_documents(documents)
        vector_store = RedisVectorStore(
            index_name="flipkart",
            index_prefix="llama",
            redis_url="redis://localhost:6379",
            overwrite=True,
        )

        index = VectorStoreIndex.from_vector_store(
            vector_store = vector_store, service_context = self.service_context)

        # set Logging to DEBUG for more detailed outputs
        query_engine = index.as_query_engine()

        sql_results_similarity_scores = {}

        responses = []

        for i in range(len(sql_response_list)):
            # print(sql_response_list[i])
            text = sql_response_list[i][2]
            query = "Calculate the the similarity score of" + text + "with the given context. Respond with only percentage score."
            # complete_query=rag_query+text
            # response = query_engine.query(query)
            responses.append(sql_response_list[i])
            # print(response)

        return responses
