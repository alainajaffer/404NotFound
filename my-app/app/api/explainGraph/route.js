import { NextResponse } from "next/server";
import OpenAI from "openai";

export async function POST(req) {
  try {
    const { imgData, level } = await req.json();

    if (!imgData) {
      throw new Error("No image data provided");
    }

    if (!level) {
      throw new Error("No level data provided");
    }

    const dummy = {
      child: `This graph shows the price of something called Bitcoin over time. Imagine Bitcoin is like a toy that people buy and sell, and its price can go up and down just like the price of toys in a store.

Up and Down: You see how the blue line goes up and down a lot? That's like when the price of your favorite toy changes every day. Sometimes it gets more expensive, and sometimes it gets cheaper.

    Months: The bottom of the graph has names of months from January to July.This tells us what time of the year we're looking at. So, we can see how the price of Bitcoin changed each month.

    Prices: The numbers on the side, like 15,000 or 50,000, are the prices of Bitcoin.When the blue line is high up, Bitcoin was expensive.When the blue line is low, Bitcoin was cheaper.

Big Drop: Around May, you see the blue line takes a big dip and goes down quickly.This means the price of Bitcoin dropped a lot during that time.

Going Up Again: Towards the end of the graph, in July, the blue line starts to go up again.This means the price of Bitcoin started to rise after being low.`,
      teen: `This graph shows the price of Bitcoin over time, from January to July. Bitcoin is a type of digital money that people can buy, sell, and trade, and its price can fluctuate a lot, similar to how stock prices change.

Up and Down: The blue line represents the price of Bitcoin. You can see it moves up and down frequently. These fluctuations indicate the changes in Bitcoin's value over time. Sometimes it rises, making Bitcoin more expensive, and other times it falls, making it cheaper.

Months: The x-axis at the bottom displays the months from January to July. This helps us track how Bitcoin's price has changed throughout these months.

Prices: The y-axis on the left shows the price in dollars, ranging from $15,000 to $50,000. When the blue line is higher on the graph, Bitcoin's price is higher. When the blue line is lower, Bitcoin's price is lower.

Big Drop: Around May, there's a noticeable steep decline in the blue line. This indicates a significant drop in Bitcoin's price during that time.

Recovery: Towards the end of the graph, around July, you can see the blue line starting to rise again. This means Bitcoin's price began to recover after the drop.

Overall, the graph illustrates the volatility of Bitcoin's price, showing periods of high and low values within the first half of the year.`,
      university: `This graph represents the price fluctuations of Bitcoin over a period from January to July. Bitcoin, a cryptocurrency, exhibits significant volatility, as indicated by the varying heights of the blue line.

Fluctuations: The blue line on the graph denotes Bitcoin's price. The frequent oscillations of the line reflect the high volatility typical of cryptocurrency markets. This volatility can be attributed to factors such as market sentiment, regulatory news, and macroeconomic trends.

Timeline: The x-axis of the graph shows the timeline, segmented by months from January to July. This allows for an analysis of how Bitcoin's price has evolved over the first half of the year.

Price Range: The y-axis represents the price of Bitcoin in US dollars, ranging from $15,000 to $50,000. The position of the blue line at any point indicates the price of Bitcoin at that specific time.

Significant Drop: In May, there is a sharp decline in the price of Bitcoin, suggesting a major market correction or response to a significant event. This could be due to various factors such as changes in regulatory policies, market sell-offs, or negative news impacting investor confidence.

Recovery Phase: By July, there is an observable upward trend, indicating a recovery in Bitcoin's price. This rise could be driven by renewed investor interest, positive market developments, or overall market recovery.

Overall, this graph highlights Bitcoin's price volatility and the impact of market dynamics over a six-month period. The significant drop in May and subsequent recovery in July are notable events that could be explored further to understand the underlying causes and market responses.`,
      graduate: `This graph depicts the price movements of Bitcoin from January to mid-July. The y-axis represents the price in US dollars, ranging from $15,000 to $50,000, while the x-axis shows the timeline segmented by dates.

In the period from early January to April, the price of Bitcoin experiences significant volatility, with fluctuations between $30,000 and $45,000. This period shows multiple peaks and troughs, indicating a highly speculative trading environment.

Around mid-April, Bitcoin reaches a high point close to $50,000. This peak could be associated with increased market optimism, positive news, or a surge in demand.

Starting in early May, there is a steep decline in Bitcoin's price, dropping from around $45,000 to below $30,000. This sharp drop is indicative of a market correction or response to negative news, such as regulatory crackdowns, significant sell-offs, or broader market fears.

After the sharp decline, the price continues to fluctuate between $20,000 and $30,000. The market appears to be searching for stability, with periods of minor recoveries followed by further drops.

Towards the end of the graph, from late June to mid-July, there is a slight upward trend, suggesting a recovery phase. The price begins to climb back up from below $20,000 to around $25,000.

Overall, this graph highlights the high volatility and sensitivity of Bitcoin's price to various market factors. The significant drop in May followed by a gradual recovery indicates a turbulent market period, likely influenced by external events and investor sentiment.`,
      expert: `This graph illustrates the price trajectory of Bitcoin from January to mid-July. The y-axis denotes the price in US dollars, spanning from $15,000 to $50,000, while the x-axis charts the timeline with dates from January to July. 

The period from early January to April is marked by substantial volatility, with Bitcoin's price oscillating between $30,000 and $45,000. These fluctuations signify a highly speculative trading environment with multiple peaks and troughs, reflecting rapid changes in market sentiment and trading volumes.

Around mid-April, Bitcoin's price peaks close to $50,000. This surge likely corresponds to heightened market optimism, possibly driven by positive developments such as institutional endorsements, favorable regulatory news, or a spike in demand from retail investors.

Starting in early May, the graph shows a pronounced and rapid decline in Bitcoin's price, plummeting from approximately $45,000 to below $30,000. This dramatic drop indicates a significant market correction, potentially triggered by negative catalysts such as regulatory crackdowns, large-scale sell-offs by major holders, or a shift in macroeconomic factors affecting investor confidence.

Following the sharp decline in May, the price continues to exhibit volatility, fluctuating between $20,000 and $30,000. The market appears to be in a phase of consolidation, with intermittent recoveries followed by further declines as it seeks to establish a new equilibrium.

In the final part of the graph, from late June to mid-July, there is a modest upward trend, suggesting the beginning of a recovery phase. The price of Bitcoin starts to rebound from below $20,000 to around $25,000, indicating renewed buying interest and possibly stabilization in market conditions.

Overall, this graph underscores Bitcoin's high volatility and the market's sensitivity to a wide array of factors. The significant downturn in May, followed by a gradual recovery, reflects the complex interplay of regulatory developments, market sentiment, macroeconomic trends, and investor behavior that influence Bitcoin's price dynamics.`
    };
    const explanation = dummy[level];
    // await getExplanationFromGPT(imgData);

    return NextResponse.json({ explanation });
  } catch (error) {
    console.error("Error explaining graph:", error.message);
    return NextResponse.json(
      { error: "Failed to explain graph", details: error.message },
      { status: 500 }
    );
  }
}

async function getExplanationFromGPT(imageData) {
  const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
  });

  const prompt = "Explain the content of this graph to a child and give it in raw text without bullet points";
  const image = "TBD"

  const response = await openai.completions.create({
    model: process.env.OPENAI_MODEL || "gpt-3.5-turbo",
    prompt: `${prompt}\n\n${image}`,
    max_tokens: 150,
  });

  return response.choices[0].text.trim();
}
