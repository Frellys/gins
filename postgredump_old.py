import subprocess
import os
import sys
import time
import datetime

now = datetime.datetime.now()
os.environ["PGPASSWORD"] = "Htubjy74"

backup_dir = "D:/backUp/postgre/" + now.strftime("%d%m%Y")+ "/"
os.mkdir(backup_dir)
gzip_dir = "C:/Hosting/utils"

def cmdexec(cmd, *args):
	p = subprocess.Popen([cmd] + list(args), shell=False, stdout=subprocess.PIPE, stdin=subprocess.PIPE, stderr=subprocess.STDOUT)
	out = p.communicate()[0]
	return out

def postgre_db_list():
	out = cmdexec('cmd.exe', '/C', 'C:/Hosting/bots/db_list.bat')
	db_list = out.split('\r\n')[5:-3]
	i = 0
	for db in db_list:
		db_list[i] = db_list[i].strip()	
		i = i + 1
	return db_list

try:
	databases = postgre_db_list()

	for database in databases:
		print database
		out = cmdexec('C:/Program Files/PostgreSQL/9.1/bin/pg_dump.exe', '--inserts', '-U', 'postgres', '-w', database)
		fn = backup_dir + database + '.sql'
		f = open(fn, 'w')
		f.write(out)
		f.close()
		out2 = cmdexec(os.path.join(gzip_dir, 'gzip.exe'), fn, '-f')
except:
	fn = 'C:/Hosting/bots/postgredump.err'
	f = open(fn, 'w')
	f.write(str(sys.exc_info()))
	f.close()
