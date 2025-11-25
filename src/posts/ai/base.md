---
icon: message
title: 大模型基础
date: 2025-01-01
category:
  - 大模型
tag:
  - 大模型
  - 基础数学
---

> 在学习之间简单介绍你可能忘记的一个数学公式
条件概率公式：p(A|B) = p(A,B)/P(B),代表在事件B已经发生的情况下，事件𝐴发生的概率是多少。
条件概率的链式法则


## 分词方法
基于词典，就是用已有的词典去最大匹配，还有一种是基于统计的

## 词向量
train的过程中要把语义的词句转换为向量，像是图片的话天然有rgb的属性，但是词语需要借助词向量工具，比如word2vec。给一个demo：
```python title="分词使用"
# gensim是自然语言处理的一个重要Python库，它包括了Word2vec
import gensim
from gensim.models import word2vec

# 语句，由原始语句经过分词后划分为的一个个词语
sentences = [['网商银行', '体验', '好'], ['网商银行','转账','快']]

# 使用word2vec进行训练
# min_count: 词语频度，低于这个阈值的词语不做词向量
# size:每个词对应向量的维度，也就是向量长度
# workers：并行训练任务数
model = word2vec.Word2Vec(sentences, size=256, min_count=1)

# 保存词向量模型，下次只需要load就可以用了
model.save("word2vec_atec")

```

## 看一下常规的