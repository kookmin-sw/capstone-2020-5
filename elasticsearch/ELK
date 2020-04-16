from elasticsearch import Elasticsearch
from elasticsearch import helpers
from tqdm import tqdm

class ELK:
    def __init__(self):
        self.host = 'http://localhost:9200'
        self.index_name = 'version1'


    def ngram(self , datas):
        result = []
        for i in range(0,len(datas)):
            result.append(datas[i:i+5])
        return result[:-5]

    def get_size(self ,search_data ):
        es = Elasticsearch(self.host)
        results = es.search(index=self.index_name,
                            body={
                                'query': {
                                    'match_phrase': {
                                        'ngram': search_data
                                    }
                                },
                                'stored_fields': [],
                                'size': 0
                            })
        return results['hits']['total']['value']


    def search(self , datas):
        es = Elasticsearch(self.host)
        ngrams = self.ngram(datas)
        result_dic = {}
        for ngram in tqdm(ngrams):
            search_data = " ".join(ngram)
            size = self.get_size(search_data)
            results = es.search(index=self.index_name ,
                    body={
                            'query':{
                                'match_phrase':{
                                    'ngram': search_data
                                }
                            },
                            'stored_fields':[],
                            'size': size
                        })
            for result in results['hits']['hits']:
                id = result['_id']
                if id in result_dic:
                    result_dic[id] = result_dic[id] + 1
                else:
                    result_dic[id] = 1
        return result_dic

    def get_ngram(self , id , search_data):
        es = Elasticsearch(self.host)
        res = es.get(index=self.index_name, id=id)
        ngram_data = res['_source']['ngram']
        ngram_size = len(ngram_data)
        index = ngram_data.index(search_data)
        print(search_data)
        origin_mnem = ""
        start_index = index-37
        end_index = index+38
        if (start_index < 0):
            start_index = 0
        if (end_index >= ngram_size):
            end_index = ngram_size

        for i in range(start_index , index):
            origin_mnem = origin_mnem + ngram_data[i].split(' ')[0]+" "
        origin_mnem += search_data +" "
        for i in range(index , end_index):
            origin_mnem += ngram_data[i].split(' ')[0] + " "
        origin_mnem = origin_mnem[:-1]
        print('total',len(origin_mnem.split(' ')))
        return origin_mnem





if __name__ == '__main__':
    datas = ['sub','push','lea','push','push','call','add','mov','xor','push','mov']


    elk = ELK()
    a = elk.get_ngram('c07fbf2f4a04b5489add016de3faf406',search_data="push lea push push call")
    print(a)
    
