---
title: "{{ replace .File.ContentBaseName "-" " " | title }}"
date: {{ with (findRE `2\d{3}-[0-1]\d-[0-3]\d` .File.ContentBaseName 1) }}{{ index . 0 }}{{ else }}{{ .Date | time.Format "2006-01-02" }}{{ end }}
publishDate: "{{ .Date | time.Format "2006-01-02" }}"
params:
  location: ""
  medium: ""
---
