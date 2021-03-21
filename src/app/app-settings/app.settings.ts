export class AppSettings {
  public static QueryString = 'minutely,hourly';
  public static City = 'city';
  public static Current = 'current';
  public static Weather = 'weather';
  public static Temp = 'temp';
  public static Main = 'main';
  public static WindSpeed = 'wind_speed';
  public static WindDeg = 'wind_deg';
  public static Pressure = 'pressure';
  public static Daily = 'daily';
  public static Week = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

  public static iconMapping = {
    drizzle: 'assets/icons/amcharts_weather/animated/rainy-5.svg',
    thunderstorm: 'assets/icons/amcharts_weather/animated/thunder.svg',
    rain: 'assets/icons/amcharts_weather/animated/rainy-6.svg',
    snow: 'assets/icons/amcharts_weather/animated/snowy-5.svg',
    clear: 'assets/icons/amcharts_weather/animated/day.svg',
    clouds: 'assets/icons/amcharts_weather/animated/cloudy.svg',
    other: 'assets/icons/amcharts_weather/animated/cloudy-day-1.svg',
  };

  public static mapWeatherIconImage(iconCategory: string) {
    return (
      this.iconMapping[iconCategory.toLocaleLowerCase()] ||
      this.iconMapping['other']
    );
  }
}
