var suggestions=document.getElementById("suggestions"),userinput=document.getElementById("userinput");document.addEventListener("keydown",inputFocus);function inputFocus(e){e.keyCode===191&&(e.preventDefault(),userinput.focus()),e.keyCode===27&&(userinput.blur(),suggestions.classList.add("d-none"))}document.addEventListener("click",function(e){var t=suggestions.contains(e.target);t||suggestions.classList.add("d-none")}),document.addEventListener("keydown",suggestionFocus);function suggestionFocus(e){const s=suggestions.querySelectorAll("a"),o=[...s],t=o.indexOf(document.activeElement);let n=0;e.keyCode===38?(e.preventDefault(),n=t>0?t-1:0,s[n].focus()):e.keyCode===40&&(e.preventDefault(),n=t+1<o.length?t+1:t,s[n].focus())}(function(){var e=new FlexSearch({preset:"score",cache:!0,doc:{id:"id",field:["title","description","content"],store:["href","title","description"]}}),n=[{id:0,href:"/docs/start/introduction/",title:"Introduction",description:"e2immu is a static code analyser for Java",content:`<h2 id="welcome">Welcome</h2>
<p>Welcome to the <em>e2immu</em> documentation.</p>
<p>We recommend <a href="/docs/road-to-immutability.html">The Road to Immutability →</a> as a first introduction to the project. This document is also available as PDF in the <a href="/docs/start/concepts/">Concepts →</a> section.</p>
<p>All downloads (sources, jars) can be found on <em>e2immu</em>&rsquo;s <a href="https://github.com/e2immu">GitHub page →</a>.</p>
<p>The <em>e2immu</em> project tries to be two things at the same time:</p>
<ul>
<li>
<p>it aspires to be <strong>educational</strong>: large software projects are easier to maintain when code is highly compartimentalised. Knowing where modifications to objects take place is crucial. <em>e2immu</em> introduces simple concepts such as <em>containers</em>, <em>eventually immutable</em>, and <em>effectively immutable</em> classes to help you manage modification better.</p>
</li>
<li>
<p>it provides a <strong>static code analyser</strong> to help you enforce the use of these concepts in your code base.
Obviously, its implementation tries to follow all the recommendations!</p>
</li>
</ul>
<h2 id="timeline">Timeline</h2>
<p><strong>The <em>e2immu</em> analyser is not ready yet</strong>. While all concepts are stable, the analyser is not robust enough yet to be applied in production settings.</p>
<p>As of 2023, the analyser provides the foundation of <a href="https://codelaser.io">CodeLaser →</a>&rsquo;s flagship product <a href="https://www.codelaser.io/jfocus-start">JFocus →</a>. As such, it is receiving the necessary attention to evolve towards a production release.</p>
<h2 id="contributing">Contributing</h2>
<p>Please consider contributing to this open source project. You can make valuable
contributions, according to your specialisation, interests and capabilities.
Read more <a href="/docs/help/contributing/">here →</a>.</p>
<h2 id="sponsoring">Sponsoring</h2>
<p>No time to contribute, but you think this project may be worthwhile?
IBTECH BV, a limited company under Belgian law, can write invoices to improve aspects of the analyser of your choice.
Please contact <a href="mailto:bart.naudts@e2immu.org">Bart Naudts</a>.</p>
`},{id:1,href:"/docs/start/concepts/",title:"Concepts",description:"e2immu concepts.",content:`<p>The best place to start reading about the  immutability concepts is:</p>
<ul>
<li><a href="/docs/road-to-immutability.html">The Road to Immutability →</a>, <a href="/docs/road-to-immutability.pdf">PDF</a></li>
</ul>
<p>There&rsquo;s also a <a href="/powerpoint/SlideDeck1.pptx">slide deck</a> covering the basic concepts.</p>
<h3 id="tldr">TL;DR</h3>
<ul>
<li>
<p><em>modification</em>: changes to the object graph of an object&rsquo;s fields.</p>
</li>
<li>
<p><em>container</em>: a type which does not make modifications to the arguments of its constructors and non-private methods. You can use it as safe storage for your objects.</p>
</li>
<li>
<p><em>final fields</em>: all fields are effectively final (either explicitly, or only modified during the construction phase). Java <code>record</code> types are a nice example.</p>
</li>
<li>
<p><em>independence</em>: a modification to one object has no effect on the other object. Fields of implicitly immutable type cannot be dependent, because the type has no means of modifying them.</p>
</li>
<li>
<p>a type is <em>immutable</em> when the following four criteria are met:</p>
<ol>
<li>the type is <em>final fields</em>;</li>
<li>its fields are not modified;</li>
<li>its fields are either private, or of immutable type;</li>
<li>constructor parameters are independent of the fields, as are the return values and parameters of non-private methods</li>
</ol>
</li>
<li>
<p><em>eventually immutable</em>: immutability is achieved after a field changes from a <em>before</em> state into an <em>after</em> or <em>final</em> state.
This blocks a number of modifying methods, which makes the type <em>effectively</em> immutable.</p>
</li>
</ul>
<p>Primitives, <code>Object</code>, and <code>String</code> are immutable - once we ignore the
synchronization methods of <code>Object</code>.
Unmodifiable variants of collection classes, such as the result of <code>Set.of()</code> and <code>List.copyOf()</code>, are immutable as well.</p>
<p>The project proposes simple support classes such as <code>SetOnce</code> and <code>EventuallyFinal</code> that help propagate eventual immutability throughout your program.</p>
`},{id:2,href:"/docs/start/analyser/",title:"Analyser",description:"e2immu is a static code analyser for Java.",content:`<p>Next to promoting the use of practical immutability, the <em>e2immu</em> project provides a static code analyser to help enforce the proper use of these immutability concepts.</p>
<p>The analyser is <em>opinionated</em>: it warns against a number of bad practices, such as:</p>
<ul>
<li>
<p>Assigning to a field outside the type of that field, is not allowed. <em>Why?</em> We believe that modification belongs to the type itself, as per the concept of a container. This may be too strong for certain situations. However, we insist that assignments to fields cannot be made outside the field itself.</p>
</li>
<li>
<p>Non-private fields must be effectively final. <em>Why?</em> We make no distinction between the different forms of non-private-ness. This restriction is closely related to the previous one, but not quite the same.</p>
</li>
<li>
<p>Methods which do not refer to the instance, must be marked <code>static</code>. This is a trivial one, just make sure your IDE does it for you.</p>
</li>
<li>
<p>Parameters should not be assigned to.</p>
</li>
</ul>
<p>The analyser assumes that exceptions are used to detect illegal situations in the code: they should never be part of the normal program flow.
It makes no distinction between static fields and instance fields for most concepts; the assumption being that non-immutable static fields are rarely used.</p>
<p>The analyser does not only study modification and immutability. It also</p>
<ul>
<li>does null-pointer analysis</li>
<li>computes preconditions</li>
<li>tracks instance state of collection objects (like when a set is empty, or not)</li>
<li>checks for dead code, useless assignments, trivial conditions, etc.</li>
<li>detects fluent methods, identity methods</li>
<li>detects singleton classes, utility classes, and extension classes</li>
<li>enforces finalizer methods</li>
</ul>
<p>The <a href="/docs/manual.html">Manual →</a> is the right place to discover what the analyser can do.</p>
`},{id:3,href:"/docs/start/buildinstall/",title:"Build, install, run",description:"How to build, install, and run the e2immu analyser.",content:`<p>Building and installing the analyser and related projects is detailed in the <a href="https://www.e2immu.org/docs/manual.html#installing">Installing e2immu →</a> section of the manual.</p>
<h3 id="tldr">TL;DR</h3>
<p>STEP 1: Ensure you have a JDK 16 (https://www.oracle.com/java/technologies/javase-jdk16-downloads.html) or better,
and <code>git</code> (https://git-scm.com/download/win).</p>
<p>STEP 2: Clone the project(s) from GitHub, minimally <a href="https://github.com/e2immu/e2immu-support">e2immu-support →</a> and <a href="https://github.com/e2immu/e2immu">e2immu →</a>.</p>
<p>STEP 3: Use the Gradle wrapper and a Java JDK 16 to build and publish the jars to your local repository</p>
<pre><code>./gradlew publishToMavenLocal
</code></pre>
<p>Now the support jar, analyser, two helper jars, and the Gradle plugin are available in your local repo.</p>
<p>STEP 4: Add the following snippet to the <code>settings.gradle</code> file of your project</p>
<pre><code>pluginManagement {
    repositories {
        mavenLocal()
        ...
    }
    resolutionStrategy {
        eachPlugin {
            if (requested.id.namespace == 'org.e2immu') {
                useModule('org.e2immu:gradle-plugin:0.2.0')
            }
        }
    }
}
</code></pre>
<p>and these two snippets to the <code>build.gradle</code> file:</p>
<pre><code>plugins {
    id 'java'
    ...
    id 'org.e2immu.analyser'
}

e2immu {
    debug = &quot;OUTPUT&quot; //INSPECT,BYTECODE_INSPECTOR,ANALYSER,DELAYED&quot;
    jmods = 'java.base.jmod,java.logging.jmod'
    sourcePackages = &quot;your.project.package.&quot; 
    readAnnotatedAPIPackages = &quot;your.project.package.aapi.&quot;
    writeAnnotationXML = true
    writeAnnotationXMLPackages = &quot;your.project.package.&quot;
    upload = true
}
</code></pre>
<p>Run the analyser on your project&rsquo;s code by executing</p>
<pre><code>./gradlew e2immu-analyser
</code></pre>
<p>STEP 5: Take a look at the <a href="https://www.e2immu.org/docs/manual.html#demo-project">demo project →</a>.</p>
`},{id:4,href:"/docs/help/manuals/",title:"Manuals",description:"List of all manuals.",content:`<p>The main manual is:</p>
<ul>
<li><a href="/docs/manual.html">e2immu manual →</a>, <a href="/docs/manual.pdf">PDF</a></li>
</ul>
<p>This manual needs additional work.</p>
<p>There&rsquo;s also a small slide deck:</p>
<ul>
<li><a href="/powerpoint/SlideDeck2.pptx">Slide deck 2</a>: slides about the <em>e2immu</em> project</li>
</ul>
`},{id:5,href:"/docs/help/javadocs/",title:"Javadoc",description:"List of all Javadocs.",content:`<p>The javadocs of the e2immu-support-x.x.x.jar can be found <a href="/docs/e2immu-support-javadoc/index.html">here</a>.</p>
`},{id:6,href:"/docs/help/plugins/",title:"Plugins",description:"e2immu in your set-up",content:`<h2 id="gradle-plugin">Gradle plugin</h2>
<p>The <a href="https://github.com/e2immu/e2immu/tree/main/gradle-plugin">Gradle plugin</a> helps integrating the analyser in your Gradle workflow.</p>
<p>All details about configuring the Gradle plugin are in the manual, see <a href="/docs/help/manuals/">Manuals →</a>.</p>
<h2 id="intellij-idea-plugin">IntelliJ IDEA plugin</h2>
<p>The <a href="https://github.com/e2immu/e2immu-intellij-plugin">IntelliJ plugin</a> is a highlighter for the IntelliJ IDEA. It shows the immutability of classes computed by the analyser in your source code editor.</p>
<p>The set-up involves a helper application, the <a href="https://github.com/e2immu/e2immu-annotation-store">annotation store</a>.</p>
<p>The plugin&rsquo;s operation is described in the manual, see <a href="/docs/help/manuals/">Manuals →</a>.</p>
<h2 id="plugins-for-other-ides">Plugins for other IDEs</h2>
<p>There is no Eclipse plugin yet, nor one for any other IDE.</p>
<p>However, the setup with an annotation store allows collaboration between multiple developers, some who use Eclipse, some who use IntelliJ. As long as they upload their (part of) the analyser&rsquo;s results to the common store, they can both see each other&rsquo;s immutability information.</p>
`},{id:7,href:"/docs/help/dependencies/",title:"Dependencies",description:"Dependencies of e2immu",content:`<p>The analyser primarily depends on</p>
<ul>
<li><a href="https://javaparser.org/">JavaParser.org</a> to parse Java source files;</li>
<li><a href="https://asm.ow2.io/">ASM</a> to parse Java byte-code.</li>
</ul>
<p>Like many other Java projects, it also uses</p>
<ul>
<li><a href="http://www.slf4j.org/">slf4j</a> and  <a href="https://logback.qos.ch/">LogBack</a> for logging;</li>
<li><a href="https://commons.apache.org/proper/commons-io/">commons.io</a> for reading and writing to files;</li>
<li><a href="https://junit.org/junit5/">JUnit 5</a> for testing.</li>
</ul>
<p>The annotation store uses</p>
<ul>
<li><a href="https://vertx.io/">Vertx.io</a> for configuration and HTTP communication.</li>
</ul>
<p>Obviously, the Gradle plugin links to Gradle libraries, and the IntelliJ highlighter to Jetbrains libraries.</p>
`},{id:8,href:"/docs/help/contributing/",title:"Contributing",description:"Contributing to e2immu",content:`<h2 id="project-governance">Project Governance</h2>
<p>The e2immu project is sponsored by IBTECH BV, a limited liability company under Belgian law. The project welcomes
contributions from the community.</p>
<h3 id="goal">Goal</h3>
<p>IBTECH aims for the e2immu analyser to become a solid, dependable tool in promoting and enforcing immutability
constraints in recent versions of Java. Until this goal is reached, it will try to avoid widening the scope of the
analyser in the direction of, for example, a general code analyser, or the ability to analyser other programming
languages.</p>
<h3 id="contributions">Contributions</h3>
<p>All contributors are expected to sign a <a href="http://">Contributor License Agreement</a> (CLA) that protects their intellectual
property rights, and at the same time gives IBTECH the legal means to manage the project.</p>
<p>The CLA contains a provision that prevents IBTECH from making the license more restrictive. It does allow IBTECH to make
the license more permissive (e.g. from LGPLv3 to Apache License v2).</p>
<p>Git and Github will be used to track individual contributions.</p>
<h2 id="covenant">Covenant</h2>
<p>The project will be managed by IBTECH and community project leads according the professional and civil collaboration
rules described in the <a href="https://www.contributor-covenant.org/version/2/0/code_of_conduct/">Contributor Covenant</a>.</p>
<h2 id="how-to-contribute">How to contribute</h2>
<p>Once you have agreed to the CLA, there are many parts of the analyser ecosystem where you can make valuable
contributions, according to your specialisation, interests or capabilities.</p>
<p>Always use issues to attach a merge request, and try to be as concise as possible in defining issues.</p>
<h3 id="bug-reports-minor-fixes-and-test-examples">Bug reports, minor fixes, and test examples</h3>
<p>Especially now in the early phase, this area offers rich pickings, as the analyser is not that stable yet. Make sure
you&rsquo;re testing against the latest version of the analyser.</p>
<p>It is important to write test examples that are as concise as possible.</p>
<h3 id="library-annotations">Library annotations</h3>
<p>The topic of library annotations can be worked on indefinitely. Once the analyser is sufficiently stable, it can propose
an annotated API, which can then be improved manually.</p>
<h3 id="user-interfaces">User interfaces</h3>
<p>This topic can generally be split into two important aspects: design, and the different implementations.</p>
<p>The design aspect centers around the most informative and least intrusive way of conveying the analyser&rsquo;s information.</p>
<p>Implementations focus on the different IDEs, and the infrastructure necessary to run the analyser in the background.</p>
<h3 id="documentation-and-tutorials">Documentation and tutorials</h3>
<p>The educational aspect of the analyser is important. I&rsquo;d almost say there cannot be sufficient material to promote good
software engineering practices.</p>
<p>Secondly, the analyser is a living piece of code, and catching up with the technical specification is a task in itself.</p>
<p>Translations of key documents are welcomed as well, especially to promote the immutability concepts to aspiring or
starting software developers. No one should be constrained in their programming skills by a lack of understanding of
English.</p>
<p>Finally, because many non-native speakers contribute in their second or third language, we welcome improved re-phrasings
in case the text deviates too much from natural language.</p>
<h3 id="the-analyser-core">The analyser core</h3>
<p>Contributing to the analyser core is not for the faint of heart, and probably requires a decent investment in time and
effort before you can make meaningful improvements or extensions.</p>
<h2 id="coding-guidelines">Coding Guidelines</h2>
<p>Contributions are expected to follow the coding guidelines promoted by the e2immu project itself as described in
the <a href="/docs/road-to-immutability.html">Road to Immutability</a>. This includes:</p>
<ul>
<li>making use of immutable or eventually immutable types as much as possible</li>
<li>avoiding types that cannot be marked <code>@Container</code></li>
</ul>
<p>Code formatting follows the default rules of the IntelliJ IDEA. IntelliJ&rsquo;s green tick box is mandatory.</p>
`},{id:9,href:"/docs/help/reporting-bugs/",title:"Reporting bugs",description:"How to report bugs?",content:`<p>The easiest way to report a bug is to create an issue in GitHub:</p>
<ul>
<li>Create a <a href="https://github.com/e2immu/e2immu/issues/new?template=bug-report---.md">bug report for the analyser</a></li>
</ul>
`},{id:10,href:"/docs/help/faq/",title:"FAQ",description:"Answers to frequently asked or important questions.",content:`<h2 id="what-is-e2immu">What is e2immu?</h2>
<p><em>e2immu</em> is a static code analyser for modern Java. It aims to help you write better code by
making you aware of unwanted constructs, possible causes for exceptions etc. Even if it includes many &ldquo;standard&rdquo;
warnings, <em>e2immu</em> is not a general code analyser:
it focuses on modification and immutability. It is able to detect that classes are immutable in practice, or not, and
why they are not.</p>
<p>It also provides a practical definition of such immutability, called &ldquo;effective immutability&rdquo;. It can detect that
classes are <em>eventually</em> immutable, i.e., they become effectively immutable after an initialisation phase. It provides
some out-of-the-box classes that help with making your own code eventually immutable.</p>
<p>Ideally, the results of the analyser are shown directly in your programming environment. At the moment, a plugin for
IntelliJ is in development. Support for Eclipse and Visual Studio Code are planned.</p>
<h2 id="is-e2immu-secure">Is e2immu secure?</h2>
<p>Interpreting this as &ldquo;Is my source code safe?&rdquo;, the answer is: Yes!</p>
<ul>
<li>The analyser reads your code and your jars; nothing can be done about that.</li>
<li>However, the analyser runs locally, in your environment. It is not Software as a Service. You have to install it
(and currently, also build it first).</li>
<li>On your request, the analyser can write out <em>annotationXml</em> and <em>annotatedAPI</em> files, to a (build) folder of your choice.</li>
<li>On your request, the analyser can upload to the annotations (not the source!) to an annotation manager of your choice.
The one provided in the project, <code>e2immu/annotation-manager</code>, can play that role.
You control where it runs, if it runs.</li>
<li>In debug mode, the analyser can, on your request, write out an annotated version of you source code.</li>
</ul>
<p>The analyser is fully open source, so you can verify these claims.
It relies on a small number of other open source projects (<a href="/docs/help/dependencies/">dependencies →</a> and <a href="/docs/help/plugins/">plugins →</a>), which you then should verify too.</p>
<h2 id="why-the-lgpl-license">Why the LGPL license?</h2>
<p>It allows you to write and distribute commercial software that incorporates the analyser.
Because of LGPL, I&rsquo;m hoping that everyone can benefit from your improvements to the analyser.</p>
<h2 id="technical-questions">Technical questions</h2>
<h3 id="illegalstateexception">IllegalStateException</h3>
<p>The following exception is one of the two more common problems in the analyser:</p>
<pre><code>07:50:04.282 [Test worker] ERROR org.e2immu.analyser.util.EventuallyFinalExtension - Overwriting effectively value: old: nullable instance type String, new object.toString()
07:50:04.282 [Test worker] WARN org.e2immu.analyser.analyser.StatementAnalyser - Caught exception while analysing statement 3 of org.e2immu.analyser.testexample.Store_0.flexible(java.lang.Object,long)
07:50:04.282 [Test worker] WARN org.e2immu.analyser.analyser.StatementAnalyser - Caught exception while analysing block 0 of: org.e2immu.analyser.testexample.Store_0.flexible(java.lang.Object,long)
07:50:04.282 [Test worker] WARN org.e2immu.analyser.analyser.MethodAnalyser - Caught exception in method analyser: org.e2immu.analyser.testexample.Store_0.flexible(java.lang.Object,long)
07:50:04.282 [Test worker] WARN org.e2immu.analyser.parser.Parser - Caught runtime exception while analysing type org.e2immu.analyser.testexample.Store_0

Trying to overwrite final value
java.lang.IllegalStateException: Trying to overwrite final value
	at org.e2immu.support.EventuallyFinal.setFinal(EventuallyFinal.java:36)
	at org.e2immu.analyser.util.EventuallyFinalExtension.setFinalAllowEquals(EventuallyFinalExtension.java:35)
</code></pre>
<p>The exception shows that because of internal problems, the analyser violates the core rule that once a decision on a topic has been made, it can never be changed anymore. The warning lines show which part of the source code caused the problem; the error line shows the competing values.</p>
<h3 id="more-than-10-iterations-needed">More than 10 iterations needed</h3>
<p>The second common exception is the &ldquo;More than 10 iterations needed&rdquo; one, really the opposite of the former.
It indicates that for a certain topic, no decision was reached, and delays kept coming iteration after iteration.
The cause is typically more difficult to pinpoint, and a <em>delay report</em> is written in logger warnings.</p>
<pre><code>java.lang.UnsupportedOperationException: More than 10 iterations needed for primary type org.e2immu.kvstore.Store?
        at org.e2immu.analyser.analyser.PrimaryTypeAnalyser.analyse(PrimaryTypeAnalyser.java:203)
        at org.e2immu.analyser.parser.Parser.analyseSortedType(Parser.java:191)
</code></pre>
`},{id:11,href:"/docs/help/",title:"Help",description:"Help of e2immu.",content:""},{id:12,href:"/docs/start/",title:"Start",description:"Starting with e2immu.",content:""},{id:13,href:"/docs/",title:"Docs",description:"Docs of e2immu.",content:""}];e.add(n),userinput.addEventListener("input",s,!0),suggestions.addEventListener("click",o,!0);function s(){var n,i=this.value,s=e.search(i,5),o=suggestions.childNodes,r=0,c=s.length;for(suggestions.classList.remove("d-none"),s.forEach(function(e){n=document.createElement("div"),n.innerHTML="<a href><span></span><span></span></a>",a=n.querySelector("a"),t=n.querySelector("span:first-child"),d=n.querySelector("span:nth-child(2)"),a.href=e.href,t.textContent=e.title,d.textContent=e.description,suggestions.appendChild(n)});o.length>c;)suggestions.removeChild(o[r])}function o(){for(;suggestions.lastChild;)suggestions.removeChild(suggestions.lastChild);return!1}})()