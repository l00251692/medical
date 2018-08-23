package com.changyu.foryou.tools;

public  class Constants {

	public static final String STATUS = "status";
	public static final String SUCCESS = "success";
	public static final String FAILURE = "failure";
	public static final String MESSAGE = "message";
	
	public static final String localIp = "https://localhost/JiMuImage"; //存放上传的图片的服务器JiMuImage为上传图片时创建的目录
    //public static String notifyUrl = "https://www.ailogic.xin/pay/payNotify";
    public static final String notifyUrl = "https://127.0.0.1/pay/payNotify";
 
    public static final String TemplateIdPaySuccess="vQoIDJ072tRjUpGDoh0GMb1qI8DzUPgBlrpOT_3p_9g";
    public static final String TemplateIdPayFail="qA_2yDLB6hlTKzsv9dY-SsFIC6QJChjTiii-kR2f-ms";
    public static final String TemplateIdPayCancel="qA_2yDLB6hlTKzsv9dY-SsFIC6QJChjTiii-kR2f-ms";
    public static final String TemplateIdWithDrawSuccess="boU1BwC-VVuIEKkeSSAMdDAL93qvohZD7AryuM5G_ps";
    
    
    public static final String REFUND_KEY_PATH = "classpath:apiclient_cert.p12";
    public static final String CERTPATH        = "apiclient_cert.p12";
    
    //七牛云相关配置
    
 
    public static final short STATUS_CANCEL=0;
    public static final short STATUS_CREATE=1;  //创建
    public static final short STATUS_PAYED=2;  //待发货
    public static final short STATUS_DELIVERED=3;  //快递发送
    public static final short STATUS_REJECTED=4;  //订单被打回需补充信息
    
    //阿里云短信配置
    
    
    
    //定时任务配置
    public static final String TIMEER_TIMCE_CICLE = "60";//单位为分钟，定时任务时间间隔
    public static final String FILE_SAVED_TIME = "60";//分钟为单位，文件保存时间
	
}
