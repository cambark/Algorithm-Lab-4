//Palendome
var pal = [7, 2, 4, 6, 9, 11, 2, 6, 10, 6, 15, 6, 14, 2, 7, 5, 13, 9, 12, 15];

//Compute Longest Palindromic Subsequence (LPS)
//A: Given array
function longPalendrome(A) {
	var n = A.length;
	//Create 2D matrix
	var S = new Array(n);
	for(var i = 0; i < n; i++) {
		S[i] = new Array(n);
	}
	
	//Loop through the matrix forwards through the end index and then backwards through the starting index
	//i is the starting index and j is the ending index for the range of values to be considered
	for(var j = 0; j < n; j++) {
		for(var i = j; i >= 0; i--) {
			//If the start and end index for the range is the same, the LPS is the single value
			if(i == j)
				S[i][j] = [A[i]];
			//If there are 2 values within the range, check if they are equal
			else if(i == j-1) {
				if(A[i] == A[j])
					//If they are the LPS is both values
					S[i][j] = [A[i]].concat(A[j])
				else
					//If not just use the first value
					S[i][j] = [A[i]];
			}
			//If the 2 end values are equal, use the existing solution for the middle values, then add on the 2 edge values to form the LPS
			else if(A[i] == A[j])
				S[i][j] = [A[i]].concat(S[i+1][j-1]).concat(A[j]);
			//If the LPS for i+1,j is larger or equal to the LPS for i,j-1 use i+1,j
			else if(S[i+1][j].length >= S[i][j-1].length)
				S[i][j] = S[i+1][j];
			//If the other way around, use i,j-1
			else
				S[i][j] = S[i][j-1];
		}
	}
	
	//Return the LPS for the full array
	return S[0][n - 1]
}

console.log(longPalendrome(pal));

//Create a random array and find the length of the LPS
var big = new Array(1000);
for(var i = 0; i < 1000; i++) {
	big[i] = Math.ceil(Math.random() * 100);
}

console.log(longPalendrome(big).length)

//Knapsack
var data = [[96, 91], [96, 92], [96, 92], [97, 94], [98, 95], [100, 94], [100, 96], [102, 97], [103, 97], [104, 99], [106, 101], [107, 101], [106, 102], [107, 102], [109, 104], [109, 106], [110, 107], [111, 108], [113, 107], [114, 110]];

//Greedy Algorithm (This is an incorrect algorithm, but illustrates the general concept of a greedy approach)

//Finds the largest ratio of given items while staying under the weight constraint W
function largestRatio(items, W) {
	var largest = 0;
	var index;
	var ratio;
	
	for(var i = 0; i < items.length; i++) {
		ratio = items[i][1]/items[i][0]
		if(ratio > largest && items[i][0] <= W) {
			largest = ratio;
			index = i;
		}
	}
	
	return index;
}

//A: List of items
//W: Max weight of knapsack
function greedyKnapsack(A, W) {
	//Duplicate the array
	var items = [].concat(A);
	
	var weight = 0;
	var value = 0;
	//Update the largest value
	var largest = largestRatio(items, W);
	
	//While there are items that can be added to the knapsack
	while(largest != undefined) {
		//Update values
		weight += items[largest][0];
		value += items[largest][1];
		//Remove the used item from the array
		items.splice(largest, 1);
		//Find a new item to be added
		largest = largestRatio(items, W-weight);
	}
	
	return value;
}

//Dynamic Programming Algorithm (This is a correct algorithm)
//A: List of items
//W: Max weight of knapsack
function dynamicKnapsack(A, W) {
	//Create a 2D matrix with starting values of 0
	var K = [];
	for(var i = 0; i <= W; i++){
		K.push([]);
		for(var j = 0; j <= A.length; j++)
			K[i].push(0);
	}
	
	//i represents the max weight for the subproblem, j represents the final index of items that are allowed to be used
	for(var j = 1; j <= A.length; j++) {
		for(var i = 1; i <= W; i++) {
			//If the value of the last item allowed to be used is larger than the weight given, that item cannot be used
			//In which case use the value computed for the same weight but one less item
			if(A[j-1][0] > i)
				K[i][j] = K[i][j-1];
			//Either the last item is used, or not
			//If it is not, the value is equal to the value computed using the same weight but one less item
			//If it is, the value is the value computed using the weight of the last item subtracted from the total weight and one less item, and added to the value of the last item
			else
				K[i][j] = Math.max(K[i][j-1], K[i-A[j-1][0]][j-1] + A[j-1][1]);
		}
	}
	
	//Return the value computed for the main weight, using the full list of items.
	return K[W][A.length];
}

console.log(greedyKnapsack(data, 100));
console.log(dynamicKnapsack(data, 100));
console.log(greedyKnapsack(data, 200));
console.log(dynamicKnapsack(data, 200));
console.log(greedyKnapsack(data, 300));
console.log(dynamicKnapsack(data, 300));
