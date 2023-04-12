<!--DESC: {"icon":"assistant",id:4} -->
<p align=center><svg width=8em src="@/@wcex/doc/assets/jobs.svg" ></svg></p>

#### Tribute and nostalgia to the greatest man of our time ---- **Steve Jobs**

#### Simple is best

It always feels that some technical systems and frameworks often make things more complicated, and always invent many concepts and terms.

In order to solve complex problems, more complex things are worked out to deal with @\_ @

_Jobs_ Can make complex computers suitable for all ages, should we also try it? Hence _WCEX_.

#### Origin and process

It all started two years ago, in the boring life of being isolated by the virus, we started trying, and soon, about a week or so, basically implemented the first initial version, including dependency changes and WebComponent implementations. But......

Two years have passed, making what we want. It's really not easy, various compatibility handling, syntax revisions and improvements, and bugs. The good thing is that by now, _WCEX_ can be used to implement the front-end development of a medium-sized product, and several internal projects are already in use, and the efficiency and effect are quite good.

#### Thoughts on two-way binding, immutable data, one-way data flow

There are a lot of frameworks now, and these things are being talked about in many places. But if you think about it, these concepts and concepts are very, very good things. But in our actual project. Is it necessary to use it universally?
In front-end development, most of the work, including what we call data binding, is essentially one thing _making the interface display and data and components internal_, and most of the actual scenarios do not use immutable data_.
This is why we later deprecated _VUEX_ in the project, without which it would be too cumbersome to use. Immutable data and unidirectional data flow are actually the logic of editing documents and processing complex businesses, but these can only be regarded as a small part of the project's functionality in development, and if the project really needs one-way data flow during implementation, then it is simple to reference third-party libraries. It can be accessed, and there are many such libraries.

So WCEX finally abandoned these concepts in the final implementation, and what we have to do is actually very simple, just make the data or interface elements that need to be consistent become the same, so there is no need to deal with these concepts in the framework, this is the application layer thing.

#### Thoughts on SCSS LESS

They're also good stuff, in the days when there was no CSS3. The processing of styles will indeed be much simplified.
But. We will find that the generated CSS is so bloated and ugly. Is there a better way?
Now CSS3 is already very powerful in power and performance, especially through _WCEX_ style binding, giving data and styles the ability to interact directly, and using simple and intuitive CSS3 directly, which is not better.

So we recommend using CSS3 directly instead of continuing to use the preprocessing of SCSS. At the same time, the good CSS blocking feature of Web Components can also help us avoid naming conflicts very well.

Again, the principle is that the content and structure of the code and essentially what you see in the DOM tree and the debug console are as consistent as possible.

#### Thoughts on performance and speed

Is performance and speed the most important? They matter. But it's not one of the most important goals we consider, although _WCEX_ has done a lot of optimizations in this area.

Now the power and performance of computers, phones, and browsers are already very powerful, with a difference of a few milliseconds. It's not a problem for people or computers. If there are really applications and requirements with high performance requirements, they can also be optimized and processed by some mature technologies, such as WebAssembly.

In our opinion. Improving performance and speed, mainly depends on the implementation of the application, as much as possible to deal with bloated code, unnecessary loading content, these performance improvements are huge.

And the speed and performance of iteration when developing, in our opinion, the meaning. It's also a little more important.

So we will see that the components implemented by _WCEX_ are relatively small and streamlined, reducing the amount of JS, CSS, HTML code, and reducing the burden on the browser engine, which is the best way to optimize. So we put a lot of effort into tweaking and optimizing Dynamic Dependency Loading and Compact Syntax.

#### Thoughts on low-code platforms, AI programming, ChatGPT

Technology and technology are developing rapidly, and I have often been asked these questions recently, low-code platforms, AI programming, ChatGPT, will these things replace programmers? Let's think about it.

First of all, we need to realize that these things are actually tools. They are no different from the stone axes and clubs that our ancestors held in their hands ten thousand years ago. It won't replace the role of programmers, but it will weed out inefficient people who don't use advanced tools. This is why our ancestor Homo sapiens finally triumphed. ChatGPT is essentially a smarter search engine that helps us get answers to questions better and faster. But in another aspect, it also requires an improvement in our own capabilities and skills, which can match these new tools.

We need to master the real technology, and this is not just about the use of certain frameworks, it's just simple application level stuff. In the face of this complex world, our programs need to deal with all kinds of things, we need to master and quickly combine real skills, these skills are including the browser itself technical system, front-end, back-end, database, mobile, embedded devices, network communication, message services, etc., which are needed and used in real projects. Now the development of technology makes us. It's easy to access knowledge and solutions, and these technologies are a big dictionary. The real technology is not how many things you already know and master, because technology develops too rapidly, and what you master is often outdated. The real technology should be: grasp the principles of these things, so as to quickly find and evaluate the most suitable technology combination through the above efficient tools, and quickly implement it, as well as promote the evolution of the technology itself.

New and smarter tools will continue to appear, and this is also a normal development law. Nature and the universe increase in entropy and tend to make things disordered and complex, while the essence of life is entropic and tends to make things orderly and simplified. Smart tools help us find answers quickly, and simplify a lot of tedious and repetitive work, giving us the opportunity to think and study more things. That's a good thing.
