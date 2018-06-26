import sqlite3,csv

conn = sqlite3.connect('mitoDB1.db')
c = conn.cursor()

class DataBaseMethod:
	splitFirstHeadingsLine = []
	def loadDataBaseFromFile(self):
		file = open("di_
47_p4.filt.var.csv","r")
		firstHeadingsLine=file.readline()
		self.splitFirstHeadingsLine = firstHeadingsLine.split(",")
		print(str(self.splitFirstHeadingsLine))
	
	def createTable(self):
		createTableCommand = '''CREATE TABLE '''
		for eachHeading in self.splitFirstHeadingsLine:
			createTableCommand+=eachHeading+ ''' , '''
		print(createTableCommand)		

	def __init__(self):
		self.loadDataBaseFromFile()
		self.createTable()
	
DB = DataBaseMethod()
DB.loadDataBaseFromFile()



[(i[j] for j in cols) for i in dr ]		
