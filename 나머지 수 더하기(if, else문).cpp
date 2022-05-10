#include <stdio.h>
main() {
    int n=1234, k, sum=0;
    while(n!=0) {
        k = n%10;
        if(k%2==0) /* 2의 배수를 구함 */ 
        sum=sum+k; 
        else
        sum=sum-k;
        n=n/10;
    }
    printf("sum=%d\n", sum);
    printf("n=%d\n", n); 
} 
