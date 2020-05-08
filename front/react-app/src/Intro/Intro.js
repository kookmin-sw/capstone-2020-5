import React, {Component} from "react";
import Nav from "../Nav/Nav";


function Intro(){



    return(

<div>
    <Nav />
    
<div id="header_wrap" class="outer">
        <header class="inner">
          <a id="forkme_banner" href="https://github.com/kookmin-sw/capstone-2020-5">View on GitHub</a>

          <h1 id="project_title">capstone-2020-5</h1>
          <h2 id="project_tagline">capstone-2020-5 created by GitHub Classroom</h2>

          
        </header>
    </div>

   
    <div id="main_content_wrap" class="outer">
      <section id="main_content" class="inner">
        <center><img src="./capstone-2020-5 _ capstone-2020-5 created by GitHub Classroom_files/77559176-2eda5d80-6eff-11ea-9ee8-17e391765665.png" width="40%" height="40%"/></center>

<center><h3>a security insight</h3></center>

<center><h3>전문가를 위한 악성코드 분석 보조도구</h3></center>

<h2 id="i-프로젝트-소개">I. 프로젝트 소개</h2>

<center><img src="./capstone-2020-5 _ capstone-2020-5 created by GitHub Classroom_files/76727702-11d3bb00-6798-11ea-8ba7-ea47c24383e5.png" width="60%" height="60%"/></center>

<p>AV-Test의 통계 조사에 따르면 매일 약 350,000 개의 악성코드가 새로 생성되고 있으며, 2019년에는 매달 평균적으로 약 12,075,800 개의 악성코드가 새로 생성되었습니다.
최근 자동 분석도구가 발전하고 있으나 100%의 정확도를 갖지 않기 때문에 일부 파일에 대해서 전문가의 개입이 필수적입니다.</p>

<center><img src="./capstone-2020-5 _ capstone-2020-5 created by GitHub Classroom_files/77532079-806ef200-6ed7-11ea-84d4-808a06fb34d4.png" width="80%" height="80%"/></center>

<p>AhnLab에 따르면 전문가가 한개의 악성코드를 분석하는데는 최소 몇시간, 최대 몇주가 소요됩니다.
그러나, 악성코드 자동분석도구의 연구는 활발한 반면 전문가를 위한 악성코드 분석도구의 연구와 투자는 턱없이 부족합니다.</p>

<p>본 프로젝트의 목표는 딥러닝 기반 악성코드 분석 보조도구를 개발하는 것입니다. 파일을 입력으로 받아 disassemble을 수행한 뒤, opcode 중 악성 행위를 수행하는 부분을 요약하는 소프트웨어를 개발함으로써 적은 인력으로도 악성코드를 효과적으로 분석할 수 있는 소프트웨어를 개발할 것입니다.</p>

<h2 id="ii-abstract">II. Abstract</h2>
<p>According to AV-test statistics, 350,000 new malicious codes are generated every day, and in 2019, an average of 12,075,800 new malicious codes were generated each month.
Experts intervention is essential for some files, as automated analysis tools have recently evolved but do not have 100% accuracy.</p>

<p>According to AnLab, it takes at least hours and weeks for an expert to analyze a malicious code.
However, research on automatic analysis tools of malicious code is active, but research and investment of malicious code analysis aids for experts is insufficient.</p>

<p>The goal of this project is to develop deep learning-based malware analysis aids.
After receiving the file as input, we will develop software that summarizes the parts that perform malicious behavior between opcode so that we can effectively analyze malicious code with a small number of people.</p>

<h2 id="iii-소개-영상">III 소개 영상</h2>

<p><a href="https://youtu.be/5gRVqjZ8mxI"><img src="./capstone-2020-5 _ capstone-2020-5 created by GitHub Classroom_files/77656906-e3d05100-6fb7-11ea-96f1-abd8fb22457e.png" alt="image"/></a></p>

<h2 id="iv-팀-소개">IV 팀 소개</h2>

<p><strong><em>지도 교수 : 윤명근 교수님</em></strong></p>

<center><img src="./capstone-2020-5 _ capstone-2020-5 created by GitHub Classroom_files/76730511-bf49cd00-679e-11ea-9065-d62f41262244.jpg" width="30%" height="30%"/></center>

<div class="language-markdown highlighter-rouge"><div class="highlight"><pre class="highlight"><code>이름 : 손현기
담당 : 팀장 / 인공지능 구현, 파서 개발, 서버구축
</code></pre></div></div>

<center><img src="./capstone-2020-5 _ capstone-2020-5 created by GitHub Classroom_files/76606717-1e68d100-6556-11ea-8047-d6524dfa9e70.jpg" width="30%" height="30%"/></center>

<div class="language-markdown highlighter-rouge"><div class="highlight"><pre class="highlight"><code>이름 : 김주환
담당 : 동향조사, 문서작업, 인공지능 구현
</code></pre></div></div>

<center><img src="./capstone-2020-5 _ capstone-2020-5 created by GitHub Classroom_files/76606671-06914d00-6556-11ea-8a88-957cdb2f6b84.jpg" width="30%" height="30%"/></center>

<div class="language-markdown highlighter-rouge"><div class="highlight"><pre class="highlight"><code>이름 : 김호준
담당 : 자료조사, 웹 프론트
</code></pre></div></div>

<center><img src="./capstone-2020-5 _ capstone-2020-5 created by GitHub Classroom_files/76729219-f1a5fb00-679b-11ea-98c3-8590ce8e0fec.jpg" width="30%" height="30%"/></center>

<div class="language-markdown highlighter-rouge"><div class="highlight"><pre class="highlight"><code>이름 : 오예린
담당 : 검색엔진, 디자이너, 웹 기획
</code></pre></div></div>

<center><img src="./capstone-2020-5 _ capstone-2020-5 created by GitHub Classroom_files/76734837-1653a000-67a7-11ea-8a96-7ea094ff1b8b.jpg" width="30%" height="30%"/></center>

<div class="language-markdown highlighter-rouge"><div class="highlight"><pre class="highlight"><code>이름 : 이동윤
담당 : 인공지능 구현, 크롤러 개발
</code></pre></div></div>

<center><img src="./capstone-2020-5 _ capstone-2020-5 created by GitHub Classroom_files/77657335-81c41b80-6fb8-11ea-9afb-30370dca3c29.jpg" width="30%" height="30%"/></center>

<div class="language-markdown highlighter-rouge"><div class="highlight"><pre class="highlight"><code>이름 : ruslan
담당 : 파서 개발, 웹 프론트
</code></pre></div></div>


      </section>
    </div>


    <div id="footer_wrap" class="outer">
      <footer class="inner">
        
        <p class="copyright">capstone-2020-5 maintained by <a href="https://github.com/kookmin-sw">kookmin-sw</a></p>
        
        <p>Published with <a href="https://pages.github.com/">GitHub Pages</a></p>
      </footer>
    </div>

  
    </div>

    );
}
export default Intro;