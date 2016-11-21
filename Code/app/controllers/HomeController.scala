package controllers

import javax.inject._

import play.api.Play.current
import play.api._
import play.api.libs.concurrent.Promise
import play.api.libs.iteratee.{Concurrent, Enumerator, Iteratee}
import play.api.libs.ws._
import play.api.mvc._

import scala.concurrent.ExecutionContext.Implicits.global



@Singleton
class HomeController @Inject()(ws: WSClient) extends Controller {

  def index = Action {
    Ok(views.html.index("Your new application is ready."))
  }

  def webSocket = WebSocket.using[String] { request =>
    val (out, channel) = Concurrent.broadcast[String]

    val in = Iteratee.foreach[String] {
      msg => println(msg)

        channel push("I received your message: " + msg)

    }
    (in,out)
  }


}
