import os
import json
from flask import Flask, send_from_directory, render_template, request, send_file
from werkzeug.utils import secure_filename
import model
import numpy as np
from collections import OrderedDict
import time
from flask_cors import CORS# 얘도 주석처리 

app = Flask(__name__, static_folder='../react-app/build')
CORS(app) #빌드 보낼때 cors 삭제
md = model.model()
md.setting()
# Serve React App
@app.route('/', defaults={'path': ''})
@app.route('/<path:path>')
def serve(path):
    if path != "" and os.path.exists(app.static_folder + '/' + path):
        return send_from_directory(app.static_folder, path)
    else:
        return send_from_directory(app.static_folder, 'index.html')

@app.route('/upload-files', methods = ['POST'])
def upload_file():
    try:
        filenames=[]
        all_file_datas = OrderedDict()
        uploaded_files = request.files.getlist("fileCollection")
        for file in uploaded_files:
            filename = secure_filename(file.filename)
            filenames.append(file.filename)
            file.save("./files/"+filename)
            X_train, file_raw = md.preprocessing(os.path.join(r"./files/", filename), md.word2vec_wv, 80, 64)
            result = md.predict(np.array(X_train))
            result_diction = {}
            for i in result:
                result_diction[i] = file_raw[i]
                
            # anomaly_funcs = md.predict2(X_train)



            file_data = OrderedDict()
            file_data["meta"] = {"md5": "55cb06fc7ddebaf8c87df15c3681a1fd", "sha256": "b384422960a820e3091e011d1a74d6cb5f5fb9f98a67e88233c7da1e3f91e778","filesize":"440.92 KB"}     
            file_data["string"]= {"0":["Project1"],"1":["cDefE!gYjjiiijj2mnop"],"2":["music"],"3":["Microsoft Windows"],"4":["frm_main"],"5":["class_main"],"6":["module_main"],"7":["module_bind"],"8":["module_rnd"],"9":["module_registry"],"10":["module_until"],"11":["module_path"],"12":["module_check"],"13":["Project1"],"14":["C:\\Program Files\\Microsoft Visual Studio\\VB98\\VB6.OLB"],"15":["C:\\WINDOWS\\system32\\msvbvm60.dll\\3"],"16":["VBRUN"],"17":["AdjustTokenPrivileges"],"18":["LookupPrivilegeValueA"],"19":["GetCurrentProcess"],"20":["GetFileAttributesA"],"21":["GetWindowTextLengthA"],"22":["MSVBVM60.DLL"]}
            file_data["import"]= {"MSVBVM60":["MethCallEngine","EVENT_SINK_AddRef","DllFunctionCall","EVENT_SINK_Release","EVENT_SINK_QueryInterface","__vbaExceptHandler","ProcCallEngine","__imp_ThunRTMain","rtcSpaceBstr","rtcSpaceVar","rtcKillFiles","rtcChangeDir","rtcBstrFromAnsi","rtcGetPresentDate","rtcGetSecondOfMinute","rtcFileLength","rtcSetFileAttr","rtcRandomNext","rtcRandomize","rtcMsgBox","rtcDoEvents","rtcShell","rtcArray","rtcStringVar","rtcVarBstrFromAnsi","rtcLeftCharBstr","__imp_rtcDir","rtcCommandVar","rtcErrObj","rtcCreateObject2"]}
            file_data["export"]= {"0":["start"]}

            file_data['anomaly_functions'] = {
                "1db4e72a613f9430f561806791378a5c": [ "push", "mov", "mov", "test", "jz", "push", "call", "and", "mov", "pop", "retn" ], "8609397dbd5b09b1a89a7cd9d2955d6c": [ "mov", "push", "mov", "push", "push", "mov", "push", "push", "call", "push", "call", "mov", "pop", "pop", "retn" ]
            }
            file_data["all_functions"] = {
                "1db4e72a613f9430f561806791378a5c": [ "push", "mov", "mov", "test", "jz", "push", "call", "and", "mov", "pop", "retn" ], 
                "8609397dbd5b09b1a89a7cd9d2955d6c": [ "mov", "push", "mov", "push", "push", "mov", "push", "push", "call", "push", "call", "mov", "pop", "pop", "retn" ]
            }
            all_file_datas[str(filename)] = file_data
            
            file_to_write = open("./json/"+file.filename, "w")
            file_to_write.write(json.dumps(file_data , ensure_ascii=False , indent="\t"))
            file_to_write.close()
        return json.dumps(filenames , ensure_ascii=False , indent="\t")
    except:
        return "error"

@app.route('/get_files', methods = ['GET'])
def get_files():
    try:
        filename = request.args.get('filename')
        with open("./json/"+filename, "r") as f:
            return json.load(f)
    except:
        return 'error'
  
    
@app.route('/get_function_data', methods=['GET'])
def get_function_data():
    try:
        # FAKE DATA!
        # WRITE SIM_JSON
        threshold =request.args.get('threshold')
        
        filename = request.args.get('filename')
        function_hash = request.args.get('hash')
        function_sim = request.args.get('sim')
        file_data = OrderedDict()
        if function_sim == "true": 
            file_data["mal_ben"] = {
                "mal": 0.2, 
                "ben": 0.8
            }
            file_data["same_functions"] = {
                
                "x3b52063cd84097a65d1633f5c74f5": {
                    "Function":"b52063cd84097a65d1633f5c74f5",
                    "cosine":"0.61",
                    "jaccard": "6.60",
                    "mnemonics": ["cmp","jz","sub","stmxcsr","mov","and","cmp","jnz","fnstcw","mov","and","cmp","lea","jnz","jmp","movq","movapd","movapd","movapd","psrlq","movd","andpd","psubd","psrlq","test","jz","cmp","jl","psllq","cmp","jg","movq","fld","retn","ucomisd","jnp","mov","sub","mov","mov","add","mov","mov","mov","call","add","fld","retn","movq","psllq","movapd","cmpnlepd","cmp","jl","cmp","jg","andpd","addsd","movq","fld","retn","fld","retn","cmpnlepd","andpd","movq","fld","retn","mov","padding","padding","padding","padding","padding","padding","padding","padding","padding","padding","padding"]
                },
               
                "db4e72a613f9430f561806791378a5c" : {
                    "Function":"cd84097a65d1633f5c74f5",
                    "cosine":"2.74",
                    "jaccard": "4.72",
                    "mnemonics": ["cmp","jz","sub","stmxcsr","mov","and","cmp","jnz","fnstcw","mov","and","cmp","lea","jnz","jmp","movq","movapd","movapd","movapd","psrlq","movd","andpd","psubd","psrlq","test","jz","cmp","jl","psllq","cmp","jg","movq","fld","retn","ucomisd","jnp","mov","sub","mov","mov","add","mov","mov","mov","call","add","fld","retn","movq","psllq","movapd","cmpnlepd","cmp","jl","cmp","jg","andpd","addsd","movq","fld","retn","fld","retn","cmpnlepd","andpd","movq","fld","retn","mov","padding","padding","padding","padding","padding","padding","padding","padding","padding","padding","padding"]
                }
            }
        else:
            file_data["mal_ben"] = {
                "mal": 0.7, 
                "ben": 0.3
            }
            file_data["same_functions"] = {
                 "x3b52063cd84097a65d1633f5c74f5": {
                    "Function":"b52063cd84097a65d1633f5c74f5",
                    "cosine":"0.61",
                    "jaccard": "6.60",
                    "mnemonics": ["cmp","jz","sub","stmxcsr","mov","and","cmp","jnz","fnstcw","mov","and","cmp","lea","jnz","jmp","movq","movapd","movapd","movapd","psrlq","movd","andpd","psubd","psrlq","test","jz","cmp","jl","psllq","cmp","jg","movq","fld","retn","ucomisd","jnp","mov","sub","mov","mov","add","mov","mov","mov","call","add","fld","retn","movq","psllq","movapd","cmpnlepd","cmp","jl","cmp","jg","andpd","addsd","movq","fld","retn","fld","retn","cmpnlepd","andpd","movq","fld","retn","mov","padding","padding","padding","padding","padding","padding","padding","padding","padding","padding","padding"]
                },
               
                "db4e72a613f9430f561806791378a5c" : {
                    "Function":"cd84097a65d1633f5c74f5",
                    "cosine":"2.74",
                    "jaccard": "4.72",
                    "mnemonics": ["cmp","jz","sub","stmxcsr","mov","and","cmp","jnz","fnstcw","mov","and","cmp","lea","jnz","jmp","movq","movapd","movapd","movapd","psrlq","movd","andpd","psubd","psrlq","test","jz","cmp","jl","psllq","cmp","jg","movq","fld","retn","ucomisd","jnp","mov","sub","mov","mov","add","mov","mov","mov","call","add","fld","retn","movq","psllq","movapd","cmpnlepd","cmp","jl","cmp","jg","andpd","addsd","movq","fld","retn","fld","retn","cmpnlepd","andpd","movq","fld","retn","mov","padding","padding","padding","padding","padding","padding","padding","padding","padding","padding","padding"]
                }
            }

        if not os.path.isdir("sim_json/"+filename):
            os.mkdir("sim_json/"+filename)

        file_path = "sim_json/"+filename+"/"+function_hash+".json"

        file_to_write = open(file_path, "w")
        file_to_write.write(json.dumps(file_data , ensure_ascii=False , indent="\t"))
        file_to_write.close()
        # RETURN SIM_JSON DATA
        with open(file_path, "r") as f:
            return json.load(f)
    except:
        return 'error'
 
@app.route('/get_search_data', methods=['GET'])
def get_search_data():
    try:
        search_value = request.args.get('search_value')
        search_type = request.args.get('search_type')

        search_data = OrderedDict()
        search_data["p_graph"] = [18, 82, 34, 66]
        search_data["origin_file_hash"] = [["ben_md5_1", "ben_md5_2", "ben_md5_3", "ben_md5_4", "ben_md5_5"], ["mal_md5_1", "mal_md5_2", "mal_md5_3", "mal_md5_4", "mal_md5_5"]]
        return json.dumps(search_data , ensure_ascii=False , indent="\t")
    except:
        return 'error'

 
@app.route('/get_db_data', methods=['GET'])
def get_db_data():
    try:
 
        db_data = OrderedDict()
        db_data["mal_data"] = ["303000"]
        db_data["ben_data"] = ["150000"]
        return json.dumps(db_data , ensure_ascii=False , indent="\t")
    except:
        return 'error'

if __name__ == '__main__':
    app.run(use_reloader=True, threaded=True)