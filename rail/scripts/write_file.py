import sys, base64, os

def main():
    if len(sys.argv) < 2:
        print("Usage: python write_file.py <path> [b64_content]")
        sys.exit(1)
    target = sys.argv[1]
    if len(sys.argv) >= 3:
        raw = sys.argv[2].encode('utf-8')
    else:
        raw = sys.stdin.buffer.read()
    os.makedirs(os.path.dirname(os.path.abspath(target)), exist_ok=True)
    with open(target, 'wb') as f:
        f.write(base64.b64decode(raw))
    print(f"Successfully wrote {target}")

if __name__ == '__main__':
    main()