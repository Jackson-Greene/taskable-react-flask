from flask_restful import Api, Resource, reqparse
import pymongo

client = pymongo.MongoClient("mongodb+srv://server_user:jUsACC1ArA4sxrOA@cluster0.htuco.mongodb.net/myFirstDatabase?retryWrites=true&w=majority")
database = client["tasks"]
user_tasks_collection = database.get_collection("user_tasks")

class TestApiHandler(Resource):
  def get(self):
    parser = reqparse.RequestParser()
    parser.add_argument("date", type=str)

    args = parser.parse_args()

    requested_date = args["date"]

    tasks_from_db = user_tasks_collection.find_one({"_id": 0, "dates.date": requested_date}, {"dates.tasks.$": 1})
    json_to_return = {}
    json_to_return["tasks"] = tasks_from_db["dates"]
    return(json_to_return)

  def post(self):
    print(self)
    parser = reqparse.RequestParser()
    parser.add_argument('type', type=str)
    parser.add_argument('message', type=str)
    

    args = parser.parse_args()

    print(args)
    # note, the post req from frontend needs to match the strings here (e.g. 'type and 'message')

    request_type = args['type']
    request_json = args['message']
    # ret_status, ret_msg = ReturnData(request_type, request_json)
    # currently just returning the req straight
    ret_status = request_type
    ret_msg = request_json

    if ret_msg:
      message = "Your Message Requested: {}".format(ret_msg)
    else:
      message = "No Msg"
    
    final_ret = {"status": "Success", "message": message}

    return final_ret