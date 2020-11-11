function fallingRocks(worldStr) {
  let levelsArr = worldStr.split("\n");
  let levelsGrid = levelsArr.reduce((grid, level, i) => {
    grid.push(level.split(""));
    return grid;
  }, []);

  const finalWorldState = [...levelsGrid];
  let worldLevelStrings;
  let fallenItems = 0;
  for (let i = 0; i < levelsGrid.length; i++) {
    if (i + 1 === levelsGrid.length) {
      worldLevelStrings = finalWorldState.reduce((output, level, i) => {
        const levelString = level.join("");
        output.push(levelString);
        if (i + 1 === finalWorldState.length) {
          const finalOutput = output.join("\n");
          return finalOutput;
        }

        return output;
      }, []);
      break;
    }

    const level = levelsGrid[i];
    const nextLevel = levelsGrid[i + 1];

    for (let j = 0; j < level.length; j++) {
      const element = level[j];

      if (element === " ") continue;

      const nextElement = nextLevel[j];

      if (nextElement === " " && element !== "-") {
        finalWorldState[i][j] = " ";
        finalWorldState[i + 1][j] = element;
        fallenItems++;
      } else if (nextElement === "." && element === ".") {
        finalWorldState[i][j] = " ";
        finalWorldState[i + 1][j] = ":";
        fallenItems++;
      } else if (nextElement === ":") {
        continue;
      }
    }
  }

  if (fallenItems > 0) {
    return fallingRocks(worldLevelStrings);
  } else {
    return worldLevelStrings;
  }
}

const test1 = ` 
.
 
 
 `;

const test2 = ` 
.
.
 `;

const test3 = ` 
.
:
 
.
.
 `;

const test4 = ` 
.
.
-
.
 
 `;

const test5 = `        
.      .
: .  :  
-   .  -
. -     
.    .  
       `;

const testCases = [test1, test2, test3, test4, test5];
for (let i = 0; i < testCases.length; i++) {
  console.log(`Test Case ${i + 1}\n\n`);
  console.log(`Input:\n'''${testCases[i]}\n'''\n\n`);
  console.log(`Output:\n'''${fallingRocks(testCases[i])}\n'''\n\n`);
}
fallingRocks(test5);

/* 
Your previous Plain Text content is preserved below:

Input:  A string which represents a two dimensional grid using the characters space, period, hyphen, colon, and newline.

Output:  The program should output a string which represents a two dimensional grid using the characters space, period, hyphen, colon, and newline.

The input characters have the following meaning:

- `.` period is a single rock
- `:` colon is two rocks
- `-` hyphen is a table
- ` ` space is empty space

The program should simulate gravity, pulling the rocks vertically down.  Rocks fall straight down until they hit the ground (the bottom of the grid) or a table (hyphen).  Rocks stack as densely as possible using the two-rock colon when there is more than one.

The output grid should be the same size as the input with the same number of lines.  The output string may omit trailing whitespace on each line.

Examples:

1. A single rock falls down:

Input:
```
.


```
Output:
```


.
```

2. Two single rocks fall into a dense two rock stack:

Input:
```
.
.
```
Output:
```

:
```

3. Five rocks fall into a stack of two colons and a single period:

Input:
```
.
:

.
.
```
Output:
```


.
:
:
```

4. Rock cannot fall through a table:

Input:
```
.
.
-
.

```
Output:
```

:
-
   
.
```

5. Each column is an independent stack of rocks:

Input:
```
.      .
: .  :
-   .  -
. -
.    .
```
Output:
```
.      
:      .    
- .    -
  -  .   
:   .:   
```

 */
