def mode(nums):
    """Return most-common number in list.

    For this function, there will always be a single-most-common value;
    you do not need to worry about handling cases where more than one item
    occurs the same number of times.

        >>> mode([1, 2, 1])
        1

        >>> mode([2, 2, 3, 3, 2])
        2
    """
    count = 0
    most_common_num = None
    for num in nums:
        cur_count = nums.count(num)
        if cur_count > count:
            count = cur_count
            most_common_num = num
    return most_common_num