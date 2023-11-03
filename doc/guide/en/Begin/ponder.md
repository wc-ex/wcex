<!--DESC: {icon:{name:"lightbulb_circle",pkg:"mdi",type:"filled"},id:4} -->
<p align=center><svg width=8em src="@/@wcex/doc/assets/jobs.svg" ></svg></p>

#### Tribute and nostalgia for the greatest man of our time ---- **Steve Jobs**

#### Simplicity is best

I always feel that development is becoming more and more complex, and there are always many new concepts and cumbersome things. In order to solve complex problems, something more complex was made to deal with @\_@.
_Jobs_ You can make complex computers for all ages, should we try it too?

#### Origin and process

It all started two years ago, in the midst of the boredom of being isolated by the virus, and we started experimenting, and very quickly, about a week or so, we basically implemented the first initial version, including dependency changes and WebComponent implementations. But......

Two years have passed, making what we want. It's really not easy, all kinds of compatibility handling, syntax revisions and improvements, and bugs. The good news is that by now, WCEX can be used to develop the front-end of a medium-sized product, and several internal projects are already in use, and the efficiency and effectiveness are quite good.

#### Thoughts on two-way binding, immutable data, and one-way data flows

There are many frameworks now, and these things are being talked about in a lot of places. But when you think about it, these concepts and ideas are very, very good things. But in our actual project. Is it necessary to use it universally?
In the development of the front-end, most of the work, including what we call data binding, is essentially to make the interface display and data and the inside of the component the same, and in fact, most of the scenarios do not use immutable data.
That's why we deprecated _VUEX_ later in the project, because it was too cumbersome to use without it. Immutable data and one-way data flow are best suited for document editing and processing complex business logic, but these are only a small part of the project's functionality in development, and if the project really needs a one-way data flow during implementation, then simply reference a third-party library. You can access it, and there are many such libraries.

So WCEX eventually dropped these concepts in the implementation, and what we had to do was actually very simple, just make the data or interface elements that need to be consistent the same, so there is no need to deal with these concepts in the framework, this is the application layer thing.

#### Thoughts on SCSS LESS

They're all good stuff too, in the days without CSS3. The handling of styles is indeed much easier.
But. We will find that the generated CSS is so bloated and ugly. Is there a better way?
Now CSS3 is very powerful in terms of functionality and performance, especially through the style binding of WCEX, which gives the ability to interact directly with data and styles, and it is not better to use simple and intuitive CSS3 directly.

So we recommend using CSS3 directly, rather than continuing to use SCSS's preprocessing. At the same time, the Web Component's good CSS closure is also a great way to help us avoid naming conflicts.

Again, the principle is **intuitive**, the content and structure of the code is as consistent as possible with what you see in the DOM Tree and the Debug Console.

#### Thoughts on performance and speed

Are performance and speed the most important? They matter. But it's not one of the most important goals we're considering, although WCEX has done a lot of optimization in this area.

Nowadays, the functions and performance of computers, mobile phones and browsers have been very powerful, with a difference of a few milliseconds. It's not a problem for people or computers. If you really have applications and requirements that require high performance, you can also optimize and deal with them through some mature technologies, such as WebAssembly.

In our opinion. Improving performance and speed depends on the implementation of the application, and dealing with bloated code and unnecessary loading content as much as possible can be a huge performance improvement.

And the speed and performance of iterations at the time of development, what we think means. It's also a little more important.

So we'll see that the components implemented by WCEX are relatively small and lean, reducing the amount of JS, CSS, HTML code, and reducing the burden on the browser engine, which is the best way to optimize. So we put a lot of effort into tweaking and optimizing Dynamic Dependency Loading and Streamlined Syntax.

#### Thoughts on low-code platforms, AI programming, ChatGPT

Technology and technology are developing rapidly, and people have often asked me these questions recently, low-code platforms, AI programming, ChatGPT, will these things replace programmers? Let's think about it.

First of all, we need to realize that these things are actually tools. They are no different from the stone axes and clubs that our ancestors held in their hands 10,000 years ago. It won't replace the role of programmers, but it will weed out inefficient people who don't use advanced tools. This is why our ancestors, Homo sapiens, ultimately triumphed. ChatGPT is essentially a more intelligent search engine that helps us get better and faster answers to our questions. But on the other hand, it also requires an improvement in our own capabilities and skills to match these new tools.

We need to get to grips with the real technology, and it's not just about using certain frameworks, it's just something at the application level. In the face of this complex world, our programs need to deal with all kinds of things, and we need to master and quickly combine real skills, including the technical system of the browser itself, front-end, back-end, database, mobile terminal, embedded devices, network communication, message service, etc., which are needed and used in practical projects. Now the development of technology has made us. Gaining knowledge and solutions has become very easy, and the above technologies are actually a big dictionary. Real technology is not about how many things you have learned and mastered, because technology is developing too quickly, and what you master is often outdated. The real technology should be to grasp the principles of these things, so as to quickly find and evaluate the most suitable technology combination through the above efficient tools, and quickly implement and promote the evolution of the technology itself.

New and smarter tools will continue to appear, and this is also a normal law of development. Nature and the universe are entropically increasing and always tend to make things disordered and complex, while the essence of life is entropy and tends to make things orderly and simplified. Smart tools help us find answers quickly and simplify a lot of tedious and repetitive tasks, giving us the opportunity to think and research more. That's a good thing.
