import asyncio
import time

async def cooking():
    print('cooking started')
    await asyncio.sleep(5)
    print('cooking finished')


async def boiling():
    print('boiling started')
    await asyncio.sleep(4)
    print('boiling finished')

async def main():
    start_time = time.time()

    batch = asyncio.gather(cooking(), boiling())
    await batch

    end_time = time.time()

    elapsed = end_time - start_time
    timer = 'elapsed time is ', elapsed
    print(timer)

if __name__ == '__main__':
    asyncio.run(main())
    

# import asyncio
# import time

# def cooking():
#     print('cooking started')
#     time.sleep(2)
#     print('cooking finished')


# def boiling():
#     print('boiling started')
#     time.sleep(4)
#     print('boiling finished')



# def main():
#     start_time = time.time()

#     cooking()
#     boiling()

#     end_time = time.time()

#     elapsed = end_time - start_time
#     timer = 'elapsed time is ', elapsed
#     print(timer)

# if __name__ == '__main__':
#     main()