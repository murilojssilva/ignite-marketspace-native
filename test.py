import itertools
print([i for i in filter(lambda x:x%5, itertools.islice(itertools.count(5), 10))])