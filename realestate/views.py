from rest_framework.decorators import api_view
from rest_framework.response import Response
from .utils import load_data, filter_by_area, price_trend, create_mock_summary

DF = load_data()

@api_view(['GET'])
def query_view(request):
    q = request.GET.get('q') or request.GET.get('areas')
    if not q:
        return Response({'error':'provide ?q=AreaName or ?areas=a,b'}, status=400)
    areas = [x.strip() for x in q.split(',') if x.strip()]
    years = request.GET.get('years')
    years = int(years) if years else None

    df_f = filter_by_area(DF, areas)
    # build chart for first area
    labels, data = price_trend(DF, areas[0], years=years) if areas else ([],[])
    summary = create_mock_summary(areas[0], df_f[df_f['area'].str.lower()==areas[0].lower()]) if areas else ''
    table = df_f.to_dict(orient='records')
    chart = { 'labels': labels, 'datasets': [ { 'label': f'Price - {areas[0]}', 'data': data } ] } if areas else {}
    return Response({ 'summary': summary, 'chart': chart, 'table': table })
from django.http import JsonResponse

def home(request):
    return JsonResponse({"message": "Real Estate API is running"})
