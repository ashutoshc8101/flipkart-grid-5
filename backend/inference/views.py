from django.shortcuts import render
from rest_framework.views import APIView
from rest_framework.response import Response

import json

from .pipeline import InferencePipeline

class InferenceAPI(APIView):

  def __init__(self):
    self.inferencePipeline = InferencePipeline()

  def get(self, request):

    prompt = request.query_params.get('prompt')

    output = self.inferencePipeline.forward(prompt)

    return Response(
      data = json.dumps(output)
    )

