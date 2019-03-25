'use strict'

exports.inherits = function(Child, Parent){
  Child.prototype = Object.create(Parent.prototype)
  Child.prototype.constructor = Child
  Child._parent = Parent.prototype
}

// ref: https://stackoverflow.com/questions/20463145/maximum-call-stack-size-exceeded-no-apparent-recursion
