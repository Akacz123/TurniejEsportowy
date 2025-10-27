FROM mcr.microsoft.com/dotnet/aspnet:8.0 AS base
WORKDIR /app
EXPOSE 10000

FROM mcr.microsoft.com/dotnet/sdk:8.0 AS build
WORKDIR /src
COPY ["ETurniejeAPI/ETurniejeAPI.csproj", "ETurniejeAPI/"]
RUN dotnet restore "ETurniejeAPI/ETurniejeAPI.csproj"
COPY . .
WORKDIR "/src/ETurniejeAPI"
RUN dotnet build "ETurniejeAPI.csproj" -c Release -o /app/build

FROM build AS publish
RUN dotnet publish "ETurniejeAPI.csproj" -c Release -o /app/publish /p:UseAppHost=false

FROM base AS final
WORKDIR /app
COPY --from=publish /app/publish .
ENV ASPNETCORE_URLS=http://+:10000
ENTRYPOINT ["dotnet", "ETurniejeAPI.dll"]