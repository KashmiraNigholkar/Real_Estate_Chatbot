import pandas as pd
from pathlib import Path
BASE = Path(__file__).resolve().parent
SAMPLE_CSV = BASE / 'data' / 'sample_data.csv'

def load_data(filepath=None):
    p = Path(filepath) if filepath else SAMPLE_CSV
    if p.suffix.lower() in ['.xlsx', '.xls']:
        df = pd.read_excel(p)
    else:
        df = pd.read_csv(p)
    df.columns = [c.strip().lower() for c in df.columns]
    # ensure expected columns exist
    if 'year' in df.columns:
        df['year'] = df['year'].astype(int)
    return df

def filter_by_area(df, areas):
    return df[df['area'].str.lower().isin([a.lower() for a in areas])]

def price_trend(df, area, years=None):
    df2 = df[df['area'].str.lower()==area.lower()]
    df2 = df2.groupby('year')['price'].mean().reset_index().sort_values('year')
    if years:
        df2 = df2.tail(years)
    labels = df2['year'].astype(str).tolist()
    data = df2['price'].astype(float).round(2).tolist()
    return labels, data

def create_mock_summary(area, df_filtered):
    if df_filtered.empty:
        return f"No data found for {area}."
    avg_price = df_filtered['price'].mean()
    latest = df_filtered.sort_values('year').iloc[-1]
    start = df_filtered.sort_values('year').iloc[0]
    trend = 'up' if latest['price'] > start['price'] else 'down' if latest['price'] < start['price'] else 'flat'
    return f"{area}: Avg price ₹{avg_price:,.0f}. Latest (year {int(latest['year'])}) price ₹{int(latest['price'])}. Price trend: {trend}."
