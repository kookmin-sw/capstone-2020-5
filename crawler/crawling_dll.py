import requests
from bs4 import BeautifulSoup
from tqdm import tqdm
import os
BASEPATH = r'D:\dll'
data = ['a','b','c','d','e','f','g','h','i','j','k','l','m','o','p','q','r','s','t','u','v','w','x','y','z']
url = 'https://www.dll-files.com'
count=0
for i in tqdm(data):
    try:
        pre_url = url + '/'+i
        res = requests.get(pre_url)
        if res.status_code ==200:
            soup = BeautifulSoup(res.text , 'html.parser')
            lis = soup.find('ul',class_='files').find_all('li')
            for li in lis:
                try:
                    new_link = url + li.find('a').attrs['href']
                    res2 = requests.get(new_link)
                    if res2.status_code ==200:
                        soup2 = BeautifulSoup(res2.text , 'html.parser')
                        sections = soup2.find_all('section' , class_='file-info-grid')
                        for section in tqdm(sections):
                            try:
                                last_url = section.find('a').attrs['href']
                                res3 = requests.get(url+last_url)
                                soup3 = BeautifulSoup(res3.text, 'html.parser')
                                download_url = soup3.find('div',class_='text right-float').find('a').attrs['href']
                                last_res = requests.get(download_url ,timeout=10)
                                with open(os.path.join(BASEPATH,str(count)+'.zip') , 'wb') as f:
                                    f.write(last_res.content)
                                count+=1
                            except:
                                pass
                except:
                    pass
    except:
        pass
