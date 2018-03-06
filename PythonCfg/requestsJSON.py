import json

'''
finds a specific pizza in the menu
'''
def findPizzainMenu(menu, pizza):
	for item in menu:
		if item["name"] == pizza:
			return item
	return 0

'''
JSON-String to add Order to orders.json:
	{
		"request" : "newOrder",
		"file" : "orders",
		"jsonData" : 
			{
				"id": "",
				"items": [
					{
						"name": "",
						"size": "",
						"price": "",
						"extras": [],
						"count": ""
					}
				],
				"total": "",
				"customerid": "",
				"contact": {
					"name": "",
					"postcode": "",
					"city": "",
					"street": "",
					"nr": "",
					"phone": ""
				},
				"done": "0"
			}
	}
Caution don't use vowel mutation!
can't be handelt by the webserver
'''
def appendOrder(json_dir, request):
	try:
		with open(json_dir + "menu.json", "r") as f:
			menu = json.load(f)
		
		for item in request['jsonData']['items']:
			menu_item = findPizzainMenu(menu, item["name"])
			print(menu_item)
			print(item["price"])
			print(menu_item["prices"])
		
	except IOError:
		response = {
			'STATUS': 'ERROR'
		}
	exit()
	try:
		with open(json_dir + request["file"] + ".json", "r") as f:
			data = json.load(f)
		
		data.append(request["jsonData"])
		
		with open(json_dir + request["file"] + ".json", "w") as f:
			json.dump(data, f)
		
		response = {
			'STATUS': 'OK'
		}
	except IOError:
		response = {
			'STATUS': 'ERROR'
		}
	response = json.dumps(response)
	return response

'''
JSON-String to get a Order by it's Order-ID
	{
		"request" : "getOrderbyId",
		"file" : "orders",
		"order_id" : ""
	}
'''
def getOrderbyId(json_dir,  request):
	try:
		with open(json_dir + request["file"] + ".json", "r") as f:
			data = json.load(f)
			
		pos = 0
		for i in range(len(data)):
			if str(data[i]["id"]) == request["order_id"]:
				pos = i
				break
				
		response = {
			'STATUS' : 'OK',
			'response_data' : data[pos]
		}
	except IOError:
		response = {
			'STATUS': 'ERROR'
		}
	response = json.dumps(response)
	return response

def getCustomerIdbyMail(json_dir, mail):
	try:
		with open(json_dir + "customers.json", "r") as f:
			data = json.load(f)
		
		for item in data:
			if mail == item['email']:
				return item['id']
		return 0
	except IOError:
		return 0

'''
JSON-String to get a Order by it's Customer-ID
	{
		"request" : "getOrderbyMail",
		"file" : "orders",
		"email" : ""
	}
'''
def getOrderbyMail(json_dir,  request):
	customerid = getCustomerIdbyMail(json_dir, request["email"])
	try:
		with open(json_dir + request["file"] + ".json", "r") as f:
			data = json.load(f)

		old_orders = []
		for customer in data:
			if customer["customerid"] == customerid:
				old_orders.append(customer["items"])

		response = {
			'STATUS' : 'OK',
			'response_data' : old_orders[0]
		}
	except IOError:
		response = {
			'STATUS': 'ERROR'
		}
	response = json.dumps(response)
	return response


