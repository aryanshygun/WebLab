x = ["three million", "two thousand", "five hundred million"]
numbers = {
    "one": "1",
    "two": "2",
    "three": "3",
    "four": "4",
    "five": "5",
    "six": "6",
    "seven": "7",
    "eight": "8",
    "nine": "9",
    "thousand": "000",
    "million": "000000",
    "hundred": "00",
}

y = []
for i in x:
    x = ""
    for j in i.split():
        x += numbers[j]
    y.append(x)

print(y)
