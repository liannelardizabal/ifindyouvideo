import scala.concurrent.Await
import scala.concurrent.Future
import scala.concurrent.duration._
import scala.concurrent.ExecutionContext.Implicits.global
import com.ifindyouvideo.videos._
import com.ifindyouvideo.database._
import com.ifindyouvideo.external._
import akka.actor._
import org.joda.time._;

implicit val system = ActorSystem("acting")

def getNewVids(interval:Interval){
    val cityRepo = new CityRepo
    val vidRepo = new VideoRepo(new YoutubeService)
    val cityList = Await.result(cityRepo.getByRegion("North America"), 
                                60000 millis)
    val cityBounds = cityList map {_.bounds}

    val start = interval.getStart.toLocalDate
    val end = interval.getEnd.toLocalDate
    val months = Months.monthsBetween(start, end).getMonths

    var itrYearMonth = new YearMonth(start.getYear, start.getMonthOfYear)
    
    var i = 0

    for (i <- 0 to months){
        val month = itrYearMonth.getMonthOfYear
        val year = itrYearMonth.getYear
        println(month, year)

        val videos  = cityBounds map {vidRepo.retrieveAndStore(year,month,_)}
        val vidList = Future.sequence(videos)
        val vidFlat = vidList map {_.flatten}
        val newVids = Await.result(vidFlat, 60000 millis)

        itrYearMonth = itrYearMonth.plusMonths(1)
    }
}