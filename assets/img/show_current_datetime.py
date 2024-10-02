import datetime
import csv

current_datetime = datetime.datetime.now()
formatted_datetime = current_datetime.strftime("%Y-%m-%d_%H-%M-%S")

filename = f"{formatted_datetime}.csv"

with open(filename, 'w', newline='') as csvfile:
    writer = csv.writer(csvfile)
    writer.writerow(['Current Datetime'])
    writer.writerow([current_datetime])

print(f"Data written to {filename}")
