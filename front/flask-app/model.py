from keras.models import model_from_json
import tensorflow as tf
import pickle
import os
from gensim.models.word2vec import Word2Vec
import hashlib
import numpy as np

class model():
    def __init__(self):
        self.UPLOAD_FILE_PATH = r""
        self.IDA_PATH = r""
        self.WORD2VEC_DIC = {}
        self.word2vec_wv = None
        self.model = None
        self.graph = None


    def setting(self):
        self.load_model(r"model_ida_lstm_0409.json", r"model_ida_lstm_0409.h5")
        self.load_word2vec(r"word2vec_0402_64_upgrade.wv")
        self.graph = tf.get_default_graph()

    def load_model(self , model_path , weight_path):
        json_file = open(model_path, "r")
        loaded_model_json = json_file.read()
        json_file.close()
        self.model = model_from_json(loaded_model_json)
        self.model.load_weights(weight_path)


    def load_word2vec(self ,word2vec_path):
        self.word2vec_wv = Word2Vec.load(word2vec_path).wv
        data = str(type(self.word2vec_wv))
        with open("a.txt",'w') as f:
            f.write(data)


    def predict(self , x_data):
        detect_anomaly = []
        THRESHOLD = 0.2
        # x_data = np.array(x_data)
        with self.graph.as_default():
            X_test_pred = self.model.predict(x_data)
        test_mae_loss = np.mean(np.abs(X_test_pred - x_data), axis=2)
        loss_data = []
        for index,i in enumerate(test_mae_loss):
            total_loss = 0
            for i2 in i:
                total_loss += i2
            loss_data.append(total_loss / 80)
            if (total_loss/80 > THRESHOLD):
                detect_anomaly.append(index)
        return detect_anomaly


    def mnem_to_word2vec(self, data_files, word_vector, func_len, vector_size):
        unknown = 'unknown'
        zero_padding = [0] * vector_size
        file = []
        file_raw = []
        for data_file in data_files:
            for blocks in data_file:
                vec_block = []
                vec_block_raw = []
                for block in blocks[:func_len]:
                    for mnemonic in block:
                        try:
                            vec_block.append(word_vector[mnemonic])
                            vec_block_raw.append(mnemonic)
                        except Exception as e:
                            print(e)
                            vec_block.append(word_vector[unknown])
                            vec_block_raw.append(unknown)
                if (len(vec_block) >= 15):
                    if (len(vec_block) < func_len):
                        for i in range(0, func_len - len(vec_block)):
                            vec_block.append(zero_padding)
                            vec_block_raw.append("padding")
                        file.append(vec_block[:func_len])
                        file_raw.append(vec_block_raw[:func_len])
        X_train = np.array(file)
        return X_train,file_raw


    def preprocessing(self , file_name , word_vector, func_len, vector_size):
        X_train = None
        with open(file_name,'rb') as f:
            data = pickle.load(f)
            X_train,file_raw = self.mnem_to_word2vec([data] , word_vector, func_len, vector_size)
        return X_train,file_raw


    def ida(self):
        pass



if __name__ == '__main__':
    md = model()
    md.setting()
    X_test , raw = md.preprocessing(r"./files/",md.word2vec_wv,80,64)
    a= md.predict(X_test)
    print(a)
    # print(type(X_test))