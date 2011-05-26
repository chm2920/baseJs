

// A simple way to check for HTML strings or ID strings
// (both of which we optimize for)
quickExpr = /^(?:[^<]*(<[\w\W]+>)[^>]*$|#([\w\-]*)$)/

// Check if a string has a non-whitespace character in it
rnotwhite = /\S/

// Used for trimming whitespace
trimLeft = /^\s+/
trimRight = /\s+$/

