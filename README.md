# A live demo is available [here](http://159.203.181.174/)

The idea here is to implement a very simple simulation engine/game loop, and a couple of different prebuilt example simulations, to aid in teaching students to conceptualize what natural selection actually is.

Core features:

- Simulation engine, seperate from the actual 'presentable' project, so that someone with the desire to do so could implement a completely different simulation, with minimal boilerplating.

  - Here the idea I think is to have 3 main 'component's:
    - A game loop that simply runs the simulation.
    - An 'entity' component, that contains the things actually being simulated (in my first example, these would be simple creatures with speed/sense/and energy attributes, as well as 'food', that simply restores energy)
      - This component would be divided into two types of entities, inanimate objects that are acted on, and entities that would do the 'acting' process (move around, eat the food, etc). (I will likely refer to these as Objects and Agents going forward)
    - A 'world' component, that contains a reference to all of the entities, and can implement functionality based on those references (such as a detection radius, or simply a request for all of a certain type of entity)
  - All 3 components would first be implemented in a simple base class, and then extended from there, to implement the specific functionality.

- At least one of the following simulations fully implemented:

  - A simple 'evolution' style simulator, where the agents would go on gathering missions every cycle, if a specific agent gathers insufficient food, it would die off, and not be present in the next cycle. If it gathered sufficient food, it would survive, and if it gathered excess resources, it would reproduce.
    - Whenever an agent reproduces, the 'child' would be created with the set of attributes the parent had, with slight up or downward shifts in some or all attributes. Over time, 'survival of the fittest' would happen, leading to a gradual shift in the attribute make-up of the population.
  - A simple 'predator/prey' simulation, where every agent is assigned a specific food node, with the potential for overlap. If there is no other agent assigned to that food node, the one assigned to it would reproduce.
    - The other situations would break down like so:
      - Prey vs prey: Both survive, but neither reproduce.
      - Prey vs predator: prey has 50% chance of survival, predator has 100% survival rate, with 50% reproduction chance
      - Predator vs predator: Both only have 50% chance of survival, 0% reproduction chance.
    - In theory this would simulate the delicate balance required between predator/prey populations in order for predators to survive.

- A way to render the simulation in real time, so that cycles can be watched as they unfold.

  - 3 different options here based on time:
    - Simplest - A basic React Component that simply sets up a grid of divs and places an image for the appropriate entity in the correct square every cycle.
    - Medium - Canvas based 2d rendering, with tweening, for smoother animations, and a more polished product over all.
    - SUPER STRETCH - A 3d rendering using Babylon.js (or Three.js, but probably babylon). This would only even be attempted if I had completed all other core functionality by EoD today.

- A graphical representation of shifts over time, to display at the end of the simulation.

- A way for users to change starting conditions for any given simulation.
  - Example: For the first simulation, users would be able to change starting population, food count per day, and starting attributes for the population.

That's the 'core' functionality, but there is certainly more I would love to implement over time. The eventual goal is a sort of 'visual coding' interface, where students could create custom agents for a simulation, and compare the results of their agents vs the general population. However, that's a massive undertaking in and of itself.

- Store past results of simulations, on a per user basis, in a database, so they can more easily see how differing 'environmental conditions' would select for different traits.
- Potentially implement web workers/worker threads on the server side to speed up simulation speed.
- Tech Stack: _Typescript_, React, Redux, Node, Express, MongoDB.

- Biggest hurdles: Implementing the 'engine' part in a way that is easily extensible without being completely redundant. Potentially rendering and processing simultaneously in a way that is performant enough to not make it completely meaningless.
- Were I to feel confident going with a 3d renderer, that would obviously be the biggest technical hurdle, even if I find an easy way to import meshes from an external source, 3d rendering is just inherently painful, and a completely new technology to me.

- Worst case scenario: If I can't figure out how to implement the engine in a super extensible way, I can just create one simulation, in the front-end code itself, and still have something resembling the core functionality of what I'm trying to do here.
  - That being said, at the end of the day, the engine itself is the primary driving motivation behind this project.
