# Fixpoint - Middleware

The fixpoint operator is a mighty tool that is capable of many interesting things.
This repo showcases a suprisingly simple kind of middleware stack implementation
using the fixpoint operator. The fixpoint operator already includes a kind of
middleware-like implementation.

For this to work, you need to work with the functionals and not with the recusive /
loop implementations of your algorithms. A functional is a function that takes a
function as one of its arguments, so we need at least a language with functions
as first class citizens. The fixpoint operator plugs the functional itself into
the functional to create the recursive implementation. For the factorial function this
looks like the following:

```
var factorial_functional = f => i => (i == 0) ? 1 : i * f(i - 1)
```

This functional takes a function and a number. The number is the usual argument of the
factorial function. The function is used for the recursion. Applying the fixpoint operator
gives the normal implementation of the factorial function:

```
var factorial = FIX(factorial_functional)

console.log(factorial(5))
```

Until now, we simply rearranged the way we write this function. But this way offers a
more powerful basis. Imagine you want to print all intermediate steps for this calculation.
Well usually it is tedious to put the logic in place without making the code awkward. You either
have one implementation, that always prints all steps, or you have two implementations with one
never printing anything and a debug version that prints all values. There are certainly other
strange ways you could try to implement this like an extra optional argument to the function that
encodes whether to print or not. But all these methods make the code less readable.

The best we could ask for is, to have a general function that implements the "printing" mechanics
and we could simply plug it where we want to have it. This is exactly, what we can do with
the fixpoint operator. Consider this printing functional:

```
var print_steps = f => f_ => p => {
  var result = f(f_)(p)
  console.log(result)
  return result
}
```

It takes two functions and wraps the second around the first. We then use the result and print it
before returning it. With this we can simply do:

```
var printing_factorial = FIX(print_steps(factorial_functional))

printing_factorial(5) // <-- prints all in between values.
```

The cool thing about this is, that someone could write a wrapper, that does some fancy stuff and you
do not care how it works. You can simply use it. 


... TODO

Read: http://www.lfcs.inf.ed.ac.uk/reports/97/ECS-LFCS-97-375/ for more ;)