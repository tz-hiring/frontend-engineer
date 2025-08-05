# Frontend Engineering Exercise

You are building a data visualization tool for an energy analyst at TransitionZero. The analyst has exported a large CSV file containing **hourly energy generation data** for the entire year 2030, and they need a web-based interface to explore and visualize this dataset effectively.

**Dataset Overview:**
- **Rows**: Each row represents a different energy technology/carrier (e.g., Solar, Wind, Gas, Nuclear, Hydro)
- **Columns**: Each column is a timestamp representing one hour (from January 1st, 2030 00:00 to December 31st, 2030 23:00)
- **Values**: Each cell contains the energy generation value in Megawatts (MW) for that specific technology at that specific hour

**Your Task**: Create a responsive, interactive web application that allows the analyst to:
- Visualize the data as a stacked area chart showing energy generation over time
- Interact with the visualization through hover tooltips and time range controls
- Explore different time periods (daily, weekly, monthly views)

The focus should be on creating a **clean, performant, and user-friendly interface** that helps the analyst understand energy generation patterns throughout the year.

Data: [generation.csv](attachment:4927a044-2441-4ffa-8bd9-8031d771e9bc:energy_balance.csv)

## Requirements

You need to build a web app that provides the analyst with features to explore the energy generation dataset. The application should handle the dataset efficiently while maintaining smooth user interactions. The following are required:

1. User should be able to view a responsive stacked area chart rendering the data provided
2. User should be able to hover over data points to see precise energy generation values (MW) for each technology at specific timestamps
3. User should be able to filter and show/hide specific energy carriers (Solar, Wind, Gas, Nuclear, etc.)
4. User should be able to zoom in/out to examine specific time periods in detail or get an overview of longer ranges

**What We're Looking For:**
- Clean, well-structured code
- Thoughtful UI/UX decisions
- Performance considerations

## Time & Submission

**Time Limit:** 4 hours

We believe this exercise can be completed within the allocated time, so please do not exceed the time limit. If you find that you cannot complete all requirements within 4 hours, that's also fine - we are very much interested in your thought process, approach to problem-solving, and how you prioritize features. If you find yourself with more time after completing the exercise, feel free to take your solution further and simply document your additions in `docs.md`

**AI Tools & Modern Workflow:**
We actively encourage the use of AI design and development tools in your workflow. We use them day-to-day and would love to see how you leverage them to improve your development process. Feel free to use tools like:
- [Cursor](https://cursor.so/)
- [v0.dev](https://v0.dev/)
- [ChatGPT](https://chat.openai.com/)
- Any other AI tools that help you work more efficiently

**Submission:**
- Required: GitHub pull request
- Optional: Document your approach, decisions, and notes in `docs.md`
- Optional: Deploy to Vercel, Netlify, or similar platform

**Presentation:**
You'll be invited to walk through your solution in a 1-hour session where we'll discuss your implementation, decisions, and how you used AI tools in your workflow.

## Setup

```bash
npm install
npm run dev
```

**Tech Stack:**
- React + TypeScript
- Tailwind CSS
- Vite


