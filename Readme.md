# Flipkart Grid 5.0 Submission

_Team Name - Wingardium Laviousa_

**Folder structure:**

- backend All Django backend code is present in this folder.
- frontend, React frontend code is present in this folder.
- notebooks, Jupyter notebooks for the LLM pipeline along with fine tuning dataset is present in this folder.


**Google Login:**
The application uses Google OAuth for signing in users.
To use this feature, create a project on google cloud api console and obtain CLIENT ID for web application.
The client id is to be inserted in `google_auth/views.py` and `index.js` files.

**Postgres SQL:**
The application is stored in postgreSQL for persistance. Any other database can be used. The config in `settings.py` needs to be updated accordingly.

**Redis stack server:**

The embedding of scrapped fashion trends are stored in redis vector store. To use this functionality, redis stack server needs to be installed.

#### Backend installation:
```
python -m venv venv # use python version 3
source venv/bin/activate

pip install -r requirements

python manage.py migrate

python manage.py createsuperuser

```

Install and run `redis stack server`. This can be done using apt for linux systems.

Example Prompt for the web application:
`I am a 22 year old male looking for a casual outfit.`

**Notebooks:**
1. `Formatted_Product-Metadata_trial.csv`: Custom dataset created for finetuning Llama 2 model for better recommendations. The finetuned model is available at `Dakshi22/Flipkart_Grid`
2. `SQL+RAG.ipynb`: The LLM pipeline used for generating recommendations using Retrieval Augmented Generation.
3. `tryfinetune.ipynb`: Notebook used to finetune llama 2 model with custom dataset in file 1.
4. `vogue__bs_scrape.ipynb`: Notebook used to scrap data from vogue india's web site.



## High Level View of the solution: 
![image](https://github.com/ashutoshc8101/flipkart-grid-5/assets/24855641/59219bf7-4f02-43e7-ae87-20173172548d)



## Low Level View of the solution: 
![image](https://github.com/ashutoshc8101/flipkart-grid-5/assets/24855641/efe22cb2-049e-4499-a1e6-c2f89af0ccdc)


### Demo

https://github.com/ashutoshc8101/flipkart-grid-5/assets/24855641/5ff003c9-e0f5-4c83-9f65-67ffd8b102d2
