Problem 1: Longest palindromic subsequence
A palindromic sequence reads the same from left to right as from right to left. More precisely, B[1,...,t] is palindromic if and only if for all 1<=i<=t, B[i]=B[t+1-i]. For example [3,5,5,2,5,5,3] and [3,5,5,3] are palindromic. Given a input array, you are asked to design a dynamic programming algorithm to compute one of its longest palindromic subsequences.

Input: an unordered array A[1,...,n]
Output: one of its longest palindromic subsequences.
For example, the output of [9, 14, 9, 5, 10, 6, 15, 6, 13, 9] should be [9, 6, 15, 6, 9]
Use Dynamic Programming to compute the answers to the following subproblems: for each pair of 1<=i<=j<=n, let S[i][j] denote the longest palindromic subsequence of A[i,...,j]. Then the solution we want is simply S[1][n].

Hints:

When j>=i+2, S[i][j] is closely related to the following three cases
S[i+1][j]
S[i][j-1]
A[i] + S[i+1][j-1] + A[j], if A[i] = A[j]
What happens for S[i][i] and S[i][i+1]?
Show your code and the output for [7, 2, 4, 6, 9, 11, 2, 6, 10, 6, 15, 6, 14, 2, 7, 5, 13, 9, 12, 15] to your TA. Next, generate an array of size 1000 with each entry being a random integer between 1 and 100. About how long are the longest palindromic subsequences in this case? Show your result to the TA.

Problem 2: Greedy and dynamic programming for Knapsack without repetition
In this lab you will be asked to implement a greedy algorithm and a dynamic programming algorithm for the Knapsack problem without repetition

Input: an array A[1,...,n] of n items and a budget W.
Each item A[i] = [weight, value]
Output: the highest total value of the items whose total weight is no more than W.
Dataset: [[96, 91], [96, 92], [96, 92], [97, 94], [98, 95], [100, 94], [100, 96], [102, 97], [103, 97], [104, 99], [106, 101], [107, 101], [106, 102], [107, 102], [109, 104], [109, 106], [110, 107], [111, 108], [113, 107], [114, 110]]
Algorithm 1: Greedy algorithm
In the greedy algrothm, you will add the item with the highest value/weight ratio under the weight constraint. Remember that you have only one copy of each item. In each step you may not be able to add the item with the highest value/weight because of the weight constraint. For example when W=10 and there are only two items [1,10] and [11,1100], the greedy algorithm outputs [1,10] (instead of none) even though its value/weight ratio is smaller than the other item.

Algorithm 2: Dynamic programming

Compute the optimal total values of the two algorithms for W=100, 200, and 300 for the dataset mentioned above.
