---
title: "{{ replace .File.ContentBaseName "-" " " | title }}"
date: "{{ with (findRE `\d{4}-\d{2}-\d{2}` .File.ContentBaseName 1) }}{{ index . 0 }}{{ else }}{{ .Date | time.Format "2006-01-02" }}{{ end }}"
publishDate: "{{ .Date | time.Format "2006-01-02" }}"
params:
  location: ""
  medium: ""
---
