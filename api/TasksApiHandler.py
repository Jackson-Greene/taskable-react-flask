from flask_restful import Api, Resource, reqparse
from flask import session
import pymongo

client = pymongo.MongoClient("mongodb+srv://server_user:jUsACC1ArA4sxrOA@cluster0.htuco.mongodb.net/myFirstDatabase?retryWrites=true&w=majority")
database = client["tasks"]
user_tasks_collection = database.get_collection("user_tasks")

class TasksGetApiHandler(Resource):
  def get(self):
    parser = reqparse.RequestParser()
    parser.add_argument("date", type=str)

    args = parser.parse_args()

    requested_date = args["date"]

    tasks_from_db = user_tasks_collection.find_one({"_id": session["id"], "dates.date": requested_date}, {"dates.tasks.$": 1})
    json_to_return = {}
    json_to_return = tasks_from_db["dates"][0]
    return(json_to_return)

  def post(self):
    return({})


class TasksPutApiHandler(Resource):
  def get(self): 
    return({})

  def put(self):
    parser = reqparse.RequestParser()
    parser.add_argument('date', type=str)
    parser.add_argument('name', type=str)
    parser.add_argument('priority', type=str)
    parser.add_argument('duration', type=int)
    parser.add_argument('duration_unit', type=str)
    parser.add_argument('color', type=str)

    args = parser.parse_args()

    requested_date = args["date"]
    requested_name = args["name"]
    requested_priority = args["priority"]
    requested_duration = args["duration"]
    requested_duration_unit = args["duration_unit"]
    requested_color = args["color"]

    new_task = {
      "name": "add task test",
      "priority": "high",
      "duration": 50,
      "duration_unit": "hour",
      "stage": "completed",
      "color": "blue"
    }
    requested_date = "13072021"
    user_tasks_collection.update_one({"_id": session["id"], "dates.date": requested_date}, {'$push': {"dates.tasks": new_task}})


    return({"status": "success"})