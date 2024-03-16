function calculateDistance(x1, y1, x2, y2) {
    return Math.sqrt(Math.pow((x2 - x1), 2) + Math.pow((y2 - y1), 2));
}

function checkTriangleFormation(length1, length2, length3) {
    if (length1 + length2 > length3 && length1 + length3 > length2 && length2 + length3 > length1) {
        return "Triangle can be built";
    } else {
        return "Triangle can't be built";
    }
}

function main(input) {
    const points = input.map(Number);
    
    const line1 = calculateDistance(...points.slice(0, 4));
    const line2 = calculateDistance(...points.slice(4, 8));
    const line3 = calculateDistance(...points.slice(8, 12));

    const triangleResult = checkTriangleFormation(line1, line2, line3);

    console.log(line1.toFixed(2));
    console.log(line2.toFixed(2));
    console.log(line3.toFixed(2));

    console.log(triangleResult);
}

main([
    '5', '6', '7', '8',
    '1', '2', '3', '4',
    '9', '10', '11', '12'
]);


main(
    [
        '7', '7', '2', '2',
        '5', '6', '2', '2',
        '95', '-14.5', '0', '-0.123'
    ]
);

/*
1.Planar coordinates
Description
Write functions for working with shapes in the standard Planar coordinate system.

Points are represented by coordinates
Lines are represented by two points, marking their beginning and ending. You will be given three line segments. Calculate their length. Check if the line segments can form a triangle.
Input
The input will consist of an array containing twelve values
Line 1, Point 1 X
Line 1, Point 1 Y
Line 1, Point 2 X
Line 1, Point 2 Y
Line 2, Point 1 X
...
Output
The output should be consisted of four lines
Three lines showing the length of each line segment
Use 2 digits of precision
Fourth line should be one of:
Triangle can be formed
Triangle can't be formed
Sample Test 1
Input
[
  '5', '6', '7', '8',
  '1', '2', '3', '4',
  '9', '10', '11', '12'
]
Output
2.83
2.83
2.83
Triangle can be built
Sample Test 2
Input
[
  '7', '7', '2', '2',
  '5', '6', '2', '2',
  '95', '-14.5', '0', '-0.123'
]
Output
7.07
5.00
96.08
Triangle can not be built
*/