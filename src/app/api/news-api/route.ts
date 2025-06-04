import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
    const country = request.nextUrl.searchParams.get('country');

    if (!country) {
        return NextResponse.json({ error: 'Country parameter is required' }, { status: 400 });
    }

    const response = await fetch(`https://newsapi.org/v2/top-headlines?country=${country}&apiKey=${process.env.NEWS_API_KEY}`);
    const data = await response.json();

    return NextResponse.json(data);
}