from django.http import JsonResponse
import pickle
import pandas as pd
import os

def recommend(movie):

    curr = os.path.dirname(__file__)
    data = os.path.join(curr,'data')
    
    movies_list = pickle.load(open(os.path.join(data,'movies_dict.pkl'),'rb'))
    movies = pd.DataFrame(movies_list)
    
    similarity = pickle.load(open(os.path.join(data,'similarity.pkl'),'rb'))

    
    # print(movie_list)
    movie_index = movies[movies['movie_id']== movie].index[0]
    
    distances = similarity[movie_index]
    
    movie_list = sorted(list(enumerate(distances)),reverse=True,key=lambda x:x[1])[1:9]

    recommended_movies = []
    for i in movie_list:
        recommended_movies.append(str(movies.iloc[i[0]].movie_id))
    return recommended_movies

    

def movie_recommend(request,movie_id):
    if request.method == 'GET':
        

        recommendation = recommend(movie_id)
        return JsonResponse({"details":recommendation})
    else:
        # Handle other HTTP methods (e.g., GET)
        return JsonResponse({"error": "Method not allowed"}, status=405)
