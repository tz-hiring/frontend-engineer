# Frontend Engineering Exercise

You are building a data visualization tool for an energy analyst at TransitionZero. The analyst has multiple datasets containing **energy generation for Indonesia** from 2023 to 2050, and they need a web-based interface to explore, visualize, and compare these datasets effectively.

**Dataset Overview:**
The application includes two datasets (`indonesia-generation-medium-resolution.json`, `indonesia-generation-high-resolution.json`) located in the `/data` directory:
   - Contains energy generation values in Megawatts (MW) for various energy technologies
   - Covers years 2023-2050 with annual data points
   - Technologies include: Solar, Wind, Gas, Nuclear, Hydro, Coal, Geothermal, and more


**Your Task**: Create a responsive, interactive web application that allows the analyst to:
- Visualize both datasets as stacked area charts showing energy data over time
- Compare medium vs. high resolution generation scenarios side-by-side, in combined views or any innovative way that might achieve the requirement


## Requirements

You need to build a web app that provides the analyst with features to explore and compare multiple energy generation scenarios. The application should handle multiple datasets efficiently while maintaining smooth user interactions. The following are required:

1. User should be able to view responsive stacked area charts rendering any of the dataset provided
2. User should be able to compare medium vs. high resolution generation data through side-by-side views or combined visualisations
3. User should be able to hover over data points to see precise energy values (MW) for each technology at specific timestamps
4. User should be able to filter and show/hide specific energy carriers (Solar, Wind, Gas, Nuclear, etc.)

The focus should be on creating a **clean, performant, and user-friendly interface** that helps the analyst understand energy patterns and compare medium vs. high resolution generation scenarios across different technologies and time periods.

---

Feel free to take inspiration from [Scenario Builder](https://builder.transitionzero.org/tz/The-Gambia/Current-Policy-scenario-for-The-Gambia?compare=Least-Cost-scenario-for-The-Gambia)

![Scenario Comparison](public/images/scenario-comparison.png)
*Visual comparison of two generation datasets.*


## Time & Submission

**Time Limit:** 1 hour

We believe this exercise can be completed within the allocated time, so please do not exceed the time limit. If you find that you cannot complete all requirements within 1 hour, that's also fine - we are very much interested in your thought process, approach to problem-solving, and how you prioritize features. If you find yourself with more time after completing the exercise, feel free to take your solution further and simply document your additions in `docs.md`

**AI Tools & Modern Workflow:**
We actively encourage the use of AI design and development tools in your workflow. We use them day-to-day and would love to see how you leverage them to improve your development process. Feel free to use tools like: [Cursor](https://cursor.so/), [v0.dev](https://v0.dev/), or any other AI tools that help you work more efficiently

**Submission:**
- Required: GitHub pull request
- Optional: Document your approach, decisions, and notes in `docs.md`
- Optional: Deploy to Vercel, Netlify, or similar platform

**Presentation:**
You'll be invited to walk through your solution in a 1-hour session where we'll discuss your implementation, decisions, and how you used AI tools in your workflow. This task will form the jumping off point for a short code-pairing exercise in your technical interview.

## Setup

The project comes with a basic chart component that you can build upon. The application is set up with a modern React development environment.

```bash
npm install
npm run dev
```

**Tech Stack:**
- React + TypeScript
- Tailwind CSS
- Vite
- Recharts (for data visualization)
- Shadcn/ui components

**Starting Point:**
You've been provided with a basic stacked area chart component in `src/components/ui/chart.tsx` that you can extend and enhance. The chart currently renders a single dataset - you'll need to modify it to handle multiple datasets and comparison functionality.

**Note:** While the project is set up with React + TypeScript + Vite, feel free to use any tech stack of your choice within the React ecosystem. Feel free to rewrite the application using your preferred framework, libraries, and tools.


