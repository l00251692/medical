package com.changyu.foryou.tools;

public  class Constants {

	public static final String STATUS = "status";
	public static final String SUCCESS = "success";
	public static final String FAILURE = "failure";
	public static final String MESSAGE = "message";
	
	public static final String localIp = "https://localhost/Image"; //存放上传的图片的服务器JiMuImage为上传图片时创建的目录
    public static final String appId="wx0993d237b65a1919";
    public static final String apiKey="f514fb2b2fd83c1c65fd0f73d1bb7653";
    public static final String mchId="1513043841";
    public static final String mchKey="f514fb2b2fd83c1c65fd0f73d1bb7653";//自己设置的秘钥
    public static final String notifyUrl = "https://www.mingjing.tech/pay/payNotify";
    //public static final String notifyUrl = "https://127.0.0.1/pay/payNotify";
 
    public static final String TemplateIdPaySuccess="vQoIDJ072tRjUpGDoh0GMb1qI8DzUPgBlrpOT_3p_9g";
    public static final String TemplateIdPayFail="qA_2yDLB6hlTKzsv9dY-SsFIC6QJChjTiii-kR2f-ms";
    public static final String TemplateIdPayCancel="qA_2yDLB6hlTKzsv9dY-SsFIC6QJChjTiii-kR2f-ms";
    public static final String TemplateIdWithDrawSuccess="boU1BwC-VVuIEKkeSSAMdDAL93qvohZD7AryuM5G_ps";
    
    
    public static final String QQMAPKEY = "NJIBZ-FDNLD-3754C-HYIBR-J3NV7-UIBHI";
    
    public static final String REFUND_KEY_PATH = "classpath:apiclient_cert.p12";
    public static final String CERTPATH        = "apiclient_cert.p12";
    
    //七牛云相关配置
    public  static final String QINIU_AK = "jxsCxEr-9Z1jeJxLUGJkMeUuRSx_8zuSI07B1mkX";
    public  static final String QINIU_SK = "Yqy_CdP_SxvrsBfNNEUSMCvuxyAf_wuFVPS7dOJu";
    public  static final String QINIU_BUCKET = "medical";
    public static final String QINIU_IP = "https://img.mingjing.tech/"; //采用绑定的域名，否则真机上不显示
 
    public static final short STATUS_CANCEL=0;
    public static final short STATUS_CREATE=1;  //创建
    public static final short STATUS_PAYED=2;  //待发货
    public static final short STATUS_DELIVERED=3;  //快递发送
    public static final short STATUS_REJECTED=4;  //订单被打回需补充信息
    public static final short STATUS_SYS_DELETE=9;
    
    //阿里云短信配置
    public  static final String ALIOS_AK = "LTAIEhsWTpBZ49Fr";  //accessKeyId
    public  static final String ALIOS_SK = "dR4Ol8Ip47SrGLYISG8ZlHt1DxbbNV";
    
    //定时任务配置
    public static final String TIMEER_TIMCE_CICLE = "60";//单位为分钟，定时任务时间间隔
    public static final String FILE_SAVED_TIME = "60";//分钟为单位，文件保存时间
	
}
