---
title: "C/C++"
layout: archive
permalink: /C/
author_profile: true
sidebar_main: true
---
{% assign posts = site.categories.C %}
{% for post in posts %} {% include archive-single.html type="grid" %} {% endfor %}