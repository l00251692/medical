package com.changyu.foryou.listener;

import java.util.Timer;
import java.util.TimerTask;
import javax.servlet.ServletContext;
import javax.servlet.ServletContextEvent;
import javax.servlet.ServletContextListener;

import com.changyu.foryou.tools.Constants;
import com.changyu.foryou.tools.TempFileManager;

/**
 * 时间监听器
 * 
 * @author xiaoqun.yi
 */
public class TempFileListener implements ServletContextListener {
	private Timer timer;
	private SystemTaskTest systemTask;
	private static String every_time_run = Constants.TIMEER_TIMCE_CICLE;
 
	// 监听器初始方法，不要弄错了
	public void contextInitialized(ServletContextEvent sce) {
 
		timer = new Timer();
		
		String path= System.getProperty("user.dir").concat("/File/");	
		systemTask = new SystemTaskTest(path, sce.getServletContext());
		try {
			sce.getServletContext().log("定时器已启动");
			// 设置在每晚24:0分执行任务
			// Calendar calendar = Calendar.getInstance();
			// //calendar.set(Calendar.HOUR_OF_DAY, 24); // 24 ,可以更改时间
			// calendar.set(Calendar.MINUTE, 28); // 0可以更改分数
			// calendar.set(Calendar.SECOND, 0);// 0 //默认为0,不以秒计
			// Date date = calendar.getTime();
			// 监听器获取网站的根目录
			Long time = Long.parseLong(every_time_run) * 60*1000;// 循环执行的时间,单位为ms
			// 第一个参数是要运行的代码,第二个参数是指定时间执行，只执行一次
			// timer.schedule(systemTask,time);
			// 第一个参数是要运行的代码，第二个参数是从什么时候开始运行，第三个参数是每隔多久在运行一次。重复执行
			timer.schedule(systemTask, 100000, time);
			sce.getServletContext().log("已经添加任务调度表");
		} catch (Exception e) {
		}
	}
 
	public void contextDestroyed(ServletContextEvent sce) {
		try {
			timer.cancel();
		} catch (Exception e) {
		}
	}
}
 
/**
 * 时间任务器
 * 
 * @author xiaoqun.yi
 */
class SystemTaskTest extends TimerTask {
	private ServletContext context;
	private String path;

	public SystemTaskTest(String path, ServletContext context) {
		this.path = path;
		this.context = context;
	}
 
	/**
	 * 把要定时执行的任务就在run中
	 */
	public void run() {	
		TempFileManager etf;	
		try {
			context.log("开始执行任务!");
			// 需要执行的代码
			etf = new TempFileManager(path);
			etf.run();		
			context.log("指定任务执行完成!");
		} catch (Exception e) {
			e.printStackTrace();
		}
	}
}