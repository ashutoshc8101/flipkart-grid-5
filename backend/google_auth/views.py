from django.shortcuts import render

from rest_framework import status
from rest_framework.authtoken.models import Token
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import AllowAny
from rest_framework.response import Response

from requests.exceptions import HTTPError
from google.oauth2 import id_token
from google.auth.transport import requests
from django.contrib.auth.models import User
from user_details.models import UserDetail
from .serializers import UserDetailsSerializer

CLIENT_ID = '817832900797-m6ouvvag42jtr29aama28trfui7dcq0h.apps.googleusercontent.com'

@api_view(['POST'])
@permission_classes([AllowAny])
def register_by_access_token(request):
    token = request.data.get('id_token')

    try:
        auth_response = id_token.verify_oauth2_token(token, requests.Request(), CLIENT_ID)

        user = User.objects.filter(email = auth_response['email']).exists()


        if not user:
            user = User.objects.create(
                username = auth_response['email'],
                first_name = auth_response['given_name'],
                last_name = auth_response['family_name'],
                email = auth_response['email']
            )

            user_details = UserDetail.objects.create(
                user = user
            )

        else:
            user = User.objects.get(email = auth_response['email'])
            user_details = UserDetail.objects.get(user = user)

    except ValueError:
        pass

    if user:
        token, _ = Token.objects.get_or_create(user=user)

        return Response(
            {
                'token': token.key,
                'user_details': UserDetailsSerializer(user_details).data,
            },
            status=status.HTTP_200_OK,
            )
    else:
        return Response(
            {
                'errors': {
                    'token': 'Invalid token'
                    }
            },
            status=status.HTTP_400_BAD_REQUEST,
        )


@api_view(['GET', 'POST'])
def authentication_test(request):
    print(request.user)
    return Response(
        {
            'message': "User successfully authenticated"
        },
        status=status.HTTP_200_OK,
    )