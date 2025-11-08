import os

root_dir = "./"  # repo juur

for subdir, dirs, files in os.walk(root_dir):
    for file in files:
        if file.endswith(".html"):
            file_path = os.path.join(subdir, file)
            with open(file_path, "r", encoding="utf-8") as f:
                content = f.read()

            if '<link rel="icon"' not in content:
                if "</head>" in content:
                    content = content.replace(
                        "</head>",
                        '    <link rel="icon" href="/favicon.ico" type="image/x-icon">\n</head>'
                    )
                    with open(file_path, "w", encoding="utf-8") as f:
                        f.write(content)
                    print(f"Lisatud favicon: {file_path}")
                else:
                    print(f"Ei leia </head> failist: {file_path}")
