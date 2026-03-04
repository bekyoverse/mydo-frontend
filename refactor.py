import os
import glob
import re

target_dir = r'C:\Users\BEKYO\Documents\2_Custom Web Testing\yusha-notion-clone'
files = glob.glob(os.path.join(target_dir, '**', '*.tsx'), recursive=True) + glob.glob(os.path.join(target_dir, '**', '*.ts'), recursive=True)

for file_path in files:
    if 'node_modules' in file_path or '.next' in file_path or 'refactor.py' in file_path:
        continue
    
    with open(file_path, 'r', encoding='utf-8') as f:
        content = f.read()
        
    original = content
    content = re.sub(r'[\'"]convex/react[\'"]', r'"@/lib/shim/convex"', content)
    content = re.sub(r'[\'"]@clerk/nextjs[\'"]', r'"@/lib/shim/clerk"', content)
    content = re.sub(r'[\'"]@/convex/_generated/api[\'"]', r'"@/lib/shim/api"', content)
    content = re.sub(r'[\'"]@/convex/_generated/dataModel[\'"]', r'"@/lib/shim/dataModel"', content)
    
    if content != original:
        print(f'Patched {file_path}')
        with open(file_path, 'w', encoding='utf-8') as f:
            f.write(content)
