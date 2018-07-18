package com.changyu.foryou.tools;

public  class Constants {

	public static final String localIp = "https://localhost/JiMuImage"; //存放上传的图片的服务器JiMuImage为上传图片时创建的目录
    public static final String appId="wxcc5ecb17be242087";
    public static final String apiKey="125666eeecee7a340f3cfcfd85be52d9";
    public static final String mchId="1508584831";
    public static final String mchKey="LiuJingTao2333KEY251692111111111";
    //public static String notifyUrl = "https://www.ailogic.xin/pay/payNotify";
    public static final String notifyUrl = "https://127.0.0.1/pay/payNotify";
 
    public static final String TemplateIdPaySuccess="vQoIDJ072tRjUpGDoh0GMb1qI8DzUPgBlrpOT_3p_9g";
    public static final String TemplateIdPayFail="qA_2yDLB6hlTKzsv9dY-SsFIC6QJChjTiii-kR2f-ms";
    public static final String TemplateIdPayCancel="qA_2yDLB6hlTKzsv9dY-SsFIC6QJChjTiii-kR2f-ms";
    public static final String TemplateIdWithDrawSuccess="boU1BwC-VVuIEKkeSSAMdDAL93qvohZD7AryuM5G_ps";
    
    
    public static final String QQMAPKEY = "NJIBZ-FDNLD-3754C-HYIBR-J3NV7-UIBHI";
    
    public static final String REFUND_KEY_PATH = "classpath:apiclient_cert.p12";
    public static final String CERTPATH        = "apiclient_cert.p12";
    
    //七牛云相关配置
    public  static final String QINIU_AK = "YxW2_V1FQj2yOYNlHlzhHiAHI4cwWkPWNIxiT_ae";
    public  static final String QINIU_SK = "1d1Uo7S3x7qJXSL8ljbW46b2dKgWL0fPjHxG4PdI";
    public  static final String QINIU_BUCKET = "lanjing";
    public static final String QINIU_IP = "https://img.ailogic.xin/"; //采用绑定的域名，否则真机上不显示
 
    public static final short STATUS_CANCEL=0;
    public static final short STATUS_CREATE=1;  //创建
    public static final short STATUS_PAYED=2;  //创建
    public static final short STATUS_DELIVERED=3;  //快递发送
	
}
