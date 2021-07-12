from flask_restful import Api, Resource, reqparse
from flask import session

class NameApiHandler(Resource):
  def get(self):
    parser = reqparse.RequestParser()
    parser.add_argument("date", type=str)

    args = parser.parse_args()

    print(session["profile"])

    json_to_return = {}
    json_to_return["name"] = "test"

  def post(self):
    
    final_ret = {"status": "Success", "message": "temp"}

    return final_ret