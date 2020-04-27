from elasticsearch import Elasticsearch
from elasticsearch import helpers
from tqdm import tqdm

class ELK:
    def __init__(self):
        self.host = 'http://localhost:9200'
    
    def ngram(self, datas, n_size):
        result = []
        for i in range(len(datas)-n_size+1):
            result.append(datas[i:i+n_size])
        return result

    def check_len(self, datas):
        if len(datas) < 5 or len(datas) > 80:
            return True
        else:
            return False

    def search(self, datas, index, size):
        es = Elasticsearch(self.host)
        search_data = " ".join(datas)
        results = es.search(
                index=index, 
                body={
                    'query': {
                        'match_phrase': {
                            'ngram': search_data
                        }
                    },
                    'stored_fields':[],
                    'size': size
                })
        return results
    
    def get_result(self, datas, index, n_size=5):
        if self.check_len(datas):
            datas = datas[:80]

        result_dic = {}
        ngrams = self.ngram(datas, n_size)
        for ngram in tqdm(ngrams):
            size = self.search(ngram, index, 0)['hits']['total']['value']
            results = self.search(ngram, index, size)
            for result in results['hits']['hits']:
                id = result['_id']
                if id in result_dic:
                    result_dic[id] += 1
                else:
                    result_dic[id] = 1
        return result_dic

if __name__ == '__main__':
    datas = ['cmp', 'jz', 'sub', 'stmxcsr', 'mov', 'and', 'cmp', 'jnz', 'fnstcw', 'mov', 'and', 'cmp', 'lea', 'jnz', 'jmp', 'movq', 'movapd', 'movapd', 'movapd', 'psrlq', 'movd', 'andpd', 'psubd', 'psrlq', 'test', 'jnz', 'cmp', 'jl', 'psllq', 'cmp', 'jg', 'movq', 'fld', 'retn', 'fld', 'retn', 'movq', 'psllq', 'movapd', 'ucomisd', 'jp', 'cmpltpd', 'cmp', 'jl', 'cmp', 'jg', 'andpd', 'subsd', 'movq', 'fld', 'retn', 'fldz', 'retn', 'cmpltpd', 'orpd', 'andpd', 'movq']
    
    elk = ELK()
    es = Elasticsearch(elk.host)
    print(es.info)

    re = elk.get_result(datas, 'ben')
    ret_search = sorted(re.items(), key=lambda x:x[1], reverse=True)
    print(ret_search[0][1])

    re = elk.get_result(datas, 'mal')
    ret_search = sorted(re.items(), key=lambda x:x[1], reverse=True)
    print(ret_search[0][1])
    #print(ret_search[0][0])
